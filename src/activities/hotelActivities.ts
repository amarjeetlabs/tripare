import { getHotels as getFromA } from "../suppliers/supplierA";
import { getHotels as getFromB } from "../suppliers/supplierB";
import { getHotels as getFromC } from "../suppliers/supplierC";

export async function fetchSupplierAHotels(city: string) {
  console.log("Fetching hotels from Supplier A for", city);
  const raw = getFromA(city);
  console.log("Supplier A returned", raw.length, "hotels");
  return raw.map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier A",
    commissionPct: h.commissionPct,
  }));
}

export async function fetchSupplierBHotels(city: string) {
  console.log("Fetching hotels from Supplier B for", city);
  const raw = getFromB(city);
  console.log("Supplier B returned", raw.length, "hotels");
  return raw.map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier B",
    commissionPct: h.commissionPct,
  }));
}

export async function fetchSupplierCHotels(city: string) {
  console.log("Fetching hotels from Supplier C for", city);
  const raw = getFromC(city);
  console.log("Supplier C returned", raw.length, "hotels");
  return raw.map((h) => ({
    name: h.name,
    price: h.price,
    supplier: "Supplier C",
    commissionPct: h.commissionPct,
  }));
}
