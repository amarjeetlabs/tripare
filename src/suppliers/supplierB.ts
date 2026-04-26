const hotels = [
  { hotelId: "b1", name: "Holtin", price: 5340, city: "delhi", commissionPct: 20 },
  { hotelId: "b2", name: "Marriot", price: 7200, city: "delhi", commissionPct: 15 },
  { hotelId: "b3", name: "Taj Palace", price: 11500, city: "delhi", commissionPct: 11 },
  { hotelId: "b4", name: "Hyatt Regency", price: 9100, city: "delhi", commissionPct: 12 },
  { hotelId: "b5", name: "The Lalit", price: 6400, city: "delhi", commissionPct: 17 },
  { hotelId: "b6", name: "Sea View", price: 4800, city: "mumbai", commissionPct: 14 },
  { hotelId: "b7", name: "Leela", price: 8500, city: "mumbai", commissionPct: 18 },
  { hotelId: "b8", name: "Trident", price: 7100, city: "mumbai", commissionPct: 11 },
  { hotelId: "b9", name: "JW Marriot", price: 10400, city: "mumbai", commissionPct: 9 },
  { hotelId: "b10", name: "Oberoi", price: 10200, city: "mumbai", commissionPct: 8 },
  { hotelId: "b11", name: "Leela Palace", price: 13900, city: "bangalore", commissionPct: 10 },
  { hotelId: "b12", name: "Sheraton", price: 7800, city: "bangalore", commissionPct: 13 },
  { hotelId: "b13", name: "Radison", price: 5700, city: "bangalore", commissionPct: 12 },
  { hotelId: "b14", name: "Taj West End", price: 13400, city: "bangalore", commissionPct: 8 },
  { hotelId: "b15", name: "Conrad", price: 11600, city: "bangalore", commissionPct: 11 },
  { hotelId: "b16", name: "Park Hyatt", price: 12800, city: "chennai", commissionPct: 9 },
  { hotelId: "b17", name: "Hilton", price: 6700, city: "chennai", commissionPct: 14 },
  { hotelId: "b18", name: "Taj Coromandel", price: 9900, city: "chennai", commissionPct: 10 },
  { hotelId: "b19", name: "Novotel", price: 5100, city: "chennai", commissionPct: 19 },
  { hotelId: "b20", name: "Rambagh Palace", price: 15200, city: "jaipur", commissionPct: 9 },
  { hotelId: "b21", name: "Holtin", price: 4900, city: "jaipur", commissionPct: 16 },
  { hotelId: "b22", name: "Clarks Amer", price: 4100, city: "jaipur", commissionPct: 15 },
  { hotelId: "b23", name: "Holiday Inn", price: 3500, city: "jaipur", commissionPct: 20 },
];

export function getHotels(city: string) {
  return hotels.filter((h) => h.city === city.toLowerCase());
}
