import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities/hotelActivities";

const { fetchSupplierAHotels, fetchSupplierBHotels, fetchSupplierCHotels } =
  proxyActivities<typeof activities>({
    startToCloseTimeout: "10 seconds",
  });

interface Hotel {
  name: string;
  price: number;
  supplier: string;
  commissionPct: number;
}

export async function hotelWorkflow(city: string): Promise<Hotel[]> {
  const [supplierA, supplierB, supplierC] = await Promise.all([
    fetchSupplierAHotels(city),
    fetchSupplierBHotels(city),
    fetchSupplierCHotels(city),
  ]);

  const bestByName = new Map<string, Hotel>();

  for (const hotel of [...supplierA, ...supplierB, ...supplierC]) {
    const existing = bestByName.get(hotel.name);
    if (!existing || hotel.price < existing.price) {
      bestByName.set(hotel.name, hotel);
    }
  }

  return Array.from(bestByName.values());
}
