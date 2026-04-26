import express from "express";
import path from "path";
import { getHotels as getSupplierAHotels } from "./suppliers/supplierA";
import { getHotels as getSupplierBHotels } from "./suppliers/supplierB";
import { getHotels as getSupplierCHotels } from "./suppliers/supplierC";
import { startHotelWorkflow } from "./services/temporalClient";
import { saveHotels, getFilteredHotels, pingRedis } from "./services/redis";

const app = express();
const PORT = process.env.PORT || 3000;

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

  try {
    console.log(`Fetching hotels for ${city}`);
    const hotels = await startHotelWorkflow(city);
    await saveHotels(city, hotels as any);
    console.log(`Cached ${(hotels as any).length} hotels for ${city} in Redis`);

    if (minPrice || maxPrice) {
      const filtered = await getFilteredHotels(
        city,
        parseFloat(minPrice),
        parseFloat(maxPrice)
      );
      console.log(`Filtered to ${filtered.length} hotels by price range`);
      res.json(filtered);
      return;
    }

    res.json(hotels);
  } catch (err) {
    console.error("Hotel workflow error:", err);
    res.status(500).json({ error: "Failed to process hotel request" });
  }
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
