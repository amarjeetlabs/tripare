const hotels = [
  { hotelId: "a1", name: "Holtin", price: 6000, city: "delhi", commissionPct: 10 },
  { hotelId: "a2", name: "Radison", price: 5900, city: "delhi", commissionPct: 13 },
  { hotelId: "a3", name: "Taj Palace", price: 12000, city: "delhi", commissionPct: 8 },
  { hotelId: "a4", name: "ITC Grand", price: 8700, city: "delhi", commissionPct: 11 },
  { hotelId: "a5", name: "Hyatt Regency", price: 9500, city: "delhi", commissionPct: 9 },
  { hotelId: "a6", name: "Sea View", price: 4500, city: "mumbai", commissionPct: 12 },
  { hotelId: "a7", name: "Oberoi", price: 9800, city: "mumbai", commissionPct: 9 },
  { hotelId: "a8", name: "Trident", price: 7600, city: "mumbai", commissionPct: 14 },
  { hotelId: "a9", name: "Marriot", price: 6800, city: "mumbai", commissionPct: 10 },
  { hotelId: "a10", name: "Taj Lands End", price: 11200, city: "mumbai", commissionPct: 7 },
  { hotelId: "a11", name: "Leela Palace", price: 14500, city: "bangalore", commissionPct: 8 },
  { hotelId: "a12", name: "ITC Windsor", price: 9200, city: "bangalore", commissionPct: 12 },
  { hotelId: "a13", name: "Radison", price: 5400, city: "bangalore", commissionPct: 15 },
  { hotelId: "a14", name: "Oberoi", price: 10500, city: "bangalore", commissionPct: 10 },
  { hotelId: "a15", name: "Taj West End", price: 12800, city: "bangalore", commissionPct: 9 },
  { hotelId: "a16", name: "Park Hyatt", price: 13200, city: "chennai", commissionPct: 11 },
  { hotelId: "a17", name: "ITC Grand Chola", price: 10800, city: "chennai", commissionPct: 8 },
  { hotelId: "a18", name: "Taj Coromandel", price: 9400, city: "chennai", commissionPct: 13 },
  { hotelId: "a19", name: "Hilton", price: 6300, city: "chennai", commissionPct: 16 },
  { hotelId: "a20", name: "Taj Lake Palace", price: 18500, city: "jaipur", commissionPct: 6 },
  { hotelId: "a21", name: "Rambagh Palace", price: 16000, city: "jaipur", commissionPct: 7 },
  { hotelId: "a22", name: "Holtin", price: 5200, city: "jaipur", commissionPct: 14 },
  { hotelId: "a23", name: "Clarks Amer", price: 3800, city: "jaipur", commissionPct: 18 },
];

export function getHotels(city: string) {
  return hotels.filter((h) => h.city === city.toLowerCase());
}
