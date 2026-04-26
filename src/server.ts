import express from "express";
import path from "path";
import { getHotels as getSupplierAHotels } from "./suppliers/supplierA";
import { getHotels as getSupplierBHotels } from "./suppliers/supplierB";
import { getHotels as getSupplierCHotels } from "./suppliers/supplierC";
import { startHotelWorkflow } from "./services/temporalClient";
import { saveHotels, getFilteredHotels, pingRedis } from "./services/redis";

const app = express();
const PORT = process.env.PORT || 3000;

interface Hotel {
  name: string;
  price: number;
  supplier: string;
  commissionPct: number;
}

function deduplicateHotels(city: string): Hotel[] {
  const supplierA = getSupplierAHotels(city).map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier A",
    commissionPct: h.commissionPct,
  }));
  const supplierB = getSupplierBHotels(city).map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier B",
    commissionPct: h.commissionPct,
  }));
  const supplierC = getSupplierCHotels(city).map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier C",
    commissionPct: h.commissionPct,
  }));

  const bestByName = new Map<string, Hotel>();
  for (const hotel of [...supplierA, ...supplierB, ...supplierC]) {
    const existing = bestByName.get(hotel.name);
    if (!existing || hotel.price < existing.price) {
      bestByName.set(hotel.name, hotel);
    }
  }

  return Array.from(bestByName.values());
}

app.use(express.static(path.join(__dirname, "../public")));

app.get("/supplierA/hotels", (req, res) => {
  const city = req.query.city as string;
  if (!city) {
    res.status(400).json({ error: "city is required" });
    return;
  }
  res.json(getSupplierAHotels(city));
});

app.get("/supplierB/hotels", (req, res) => {
  const city = req.query.city as string;
  if (!city) {
    res.status(400).json({ error: "city is required" });
    return;
  }
  res.json(getSupplierBHotels(city));
});

app.get("/supplierC/hotels", (req, res) => {
  const city = req.query.city as string;
  if (!city) {
    res.status(400).json({ error: "city is required" });
    return;
  }
  res.json(getSupplierCHotels(city));
});

app.get("/api/hotels", async (req, res) => {
  const city = req.query.city as string;
  const minPrice = req.query.minPrice as string;
  const maxPrice = req.query.maxPrice as string;

  if (!city) {
    res.status(400).json({ error: "city is required" });
    return;
  }

  let hotels: Hotel[];

  try {
    console.log(`Fetching hotels for ${city} via Temporal`);
    hotels = (await startHotelWorkflow(city)) as Hotel[];
  } catch (err: any) {
    console.log("Temporal unavailable, using direct dedup:", err.message);
    hotels = deduplicateHotels(city);
  }

  try {
    await saveHotels(city, hotels);
    console.log(`Cached ${hotels.length} hotels for ${city} in Redis`);
  } catch (err: any) {
    console.log("Redis unavailable, skipping cache:", err.message);
  }

  if (minPrice || maxPrice) {
    try {
      const filtered = await getFilteredHotels(
        city,
        parseFloat(minPrice),
        parseFloat(maxPrice)
      );
      console.log(`Filtered to ${filtered.length} hotels by price range`);
      res.json(filtered);
      return;
    } catch {
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      const filtered = hotels.filter((h) => h.price >= min && h.price <= max);
      res.json(filtered);
      return;
    }
  }

  res.json(hotels);
});

app.get("/health", async (_req, res) => {
  const redisOk = await pingRedis();

  let supplierAOk = true;
  let supplierBOk = true;
  let supplierCOk = true;
  try {
    getSupplierAHotels("delhi");
  } catch {
    supplierAOk = false;
  }
  try {
    getSupplierBHotels("delhi");
  } catch {
    supplierBOk = false;
  }
  try {
    getSupplierCHotels("delhi");
  } catch {
    supplierCOk = false;
  }

  const allHealthy = redisOk && supplierAOk && supplierBOk && supplierCOk;
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? "healthy" : "degraded",
    redis: redisOk ? "up" : "down",
    supplierA: supplierAOk ? "up" : "down",
    supplierB: supplierBOk ? "up" : "down",
    supplierC: supplierCOk ? "up" : "down",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
