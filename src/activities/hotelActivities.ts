import { getHotels as getFromA } from "../suppliers/supplierA";
import { getHotels as getFromB } from "../suppliers/supplierB";
import { getHotels as getFromC } from "../suppliers/supplierC";

export async function fetchSupplierAHotels(city: string) {
  const raw = getFromA(city);
  return raw.map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier A",
    commissionPct: h.commissionPct,
  }));
}

export async function fetchSupplierBHotels(city: string) {
  const raw = getFromB(city);
  return raw.map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier B",
    commissionPct: h.commissionPct,
  }));
}

export async function fetchSupplierCHotels(city: string) {
  const raw = getFromC(city);
  return raw.map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier C",
    commissionPct: h.commissionPct,
  }));
}
