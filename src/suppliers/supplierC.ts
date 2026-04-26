const hotels = [
  { hotelId: "c1", name: "Radison", price: 5600, city: "delhi", commissionPct: 14 },
  { hotelId: "c2", name: "The Lalit", price: 6100, city: "delhi", commissionPct: 16 },
  { hotelId: "c3", name: "Shangri-La", price: 13500, city: "delhi", commissionPct: 7 },
  { hotelId: "c4", name: "ITC Grand", price: 8400, city: "delhi", commissionPct: 10 },
  { hotelId: "c5", name: "Lemon Tree", price: 3200, city: "delhi", commissionPct: 22 },
  { hotelId: "c6", name: "Taj Lands End", price: 10800, city: "mumbai", commissionPct: 9 },
  { hotelId: "c7", name: "Marriot", price: 7100, city: "mumbai", commissionPct: 12 },
  { hotelId: "c8", name: "Grand Hyatt", price: 8900, city: "mumbai", commissionPct: 10 },
  { hotelId: "c9", name: "Four Seasons", price: 15600, city: "mumbai", commissionPct: 6 },
  { hotelId: "c10", name: "Sea View", price: 4200, city: "mumbai", commissionPct: 16 },
  { hotelId: "c11", name: "ITC Windsor", price: 8800, city: "bangalore", commissionPct: 11 },
  { hotelId: "c12", name: "Oberoi", price: 10100, city: "bangalore", commissionPct: 9 },
  { hotelId: "c13", name: "Taj West End", price: 12500, city: "bangalore", commissionPct: 10 },
  { hotelId: "c14", name: "Lemon Tree", price: 3600, city: "bangalore", commissionPct: 21 },
  { hotelId: "c15", name: "JW Marriot", price: 9600, city: "bangalore", commissionPct: 13 },
  { hotelId: "c16", name: "ITC Grand Chola", price: 10200, city: "chennai", commissionPct: 10 },
  { hotelId: "c17", name: "Hilton", price: 6500, city: "chennai", commissionPct: 15 },
  { hotelId: "c18", name: "Radison", price: 4800, city: "chennai", commissionPct: 17 },
  { hotelId: "c19", name: "Lemon Tree", price: 3100, city: "chennai", commissionPct: 23 },
  { hotelId: "c20", name: "Taj Lake Palace", price: 17800, city: "jaipur", commissionPct: 7 },
  { hotelId: "c21", name: "Rambagh Palace", price: 15500, city: "jaipur", commissionPct: 8 },
  { hotelId: "c22", name: "ITC Rajputana", price: 7200, city: "jaipur", commissionPct: 13 },
  { hotelId: "c23", name: "Hilton", price: 5800, city: "jaipur", commissionPct: 16 },
];

export function getHotels(city: string) {
  return hotels.filter((h) => h.city === city.toLowerCase());
}
