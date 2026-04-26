import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
});

interface Hotel {
  name: string;
  price: number;
  supplier: string;
  commissionPct: number;
}

export async function saveHotels(city: string, hotels: Hotel[]) {
  const key = `hotels:${city.toLowerCase()}`;
  await redis.del(key);

  if (hotels.length === 0) return;

  const pipeline = redis.pipeline();
  for (const hotel of hotels) {
    pipeline.zadd(key, hotel.price, JSON.stringify(hotel));
  }
  await pipeline.exec();
}

export async function getFilteredHotels(
  city: string,
  minPrice: number,
  maxPrice: number
) {
  const key = `hotels:${city.toLowerCase()}`;
  const min = isNaN(minPrice) ? "-inf" : minPrice;
  const max = isNaN(maxPrice) ? "+inf" : maxPrice;

  const results = await redis.zrangebyscore(key, min, max);
  return results.map((r) => JSON.parse(r));
}

export async function pingRedis(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch {
    return false;
  }
}
