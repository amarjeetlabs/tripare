# Hotel Offer Orchestrator

Aggregates hotel offers from two mock suppliers, deduplicates hotels by name, and returns the best-priced option per hotel. Uses Temporal.io for workflow orchestration and Redis for caching with price-range filtering.

## Tech Stack

- Node.js with TypeScript
- Express
- Temporal.io
- Redis
- Docker Compose

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/hotels?city=delhi` | Fetch deduplicated best-priced hotels for a city |
| `GET /api/hotels?city=delhi&minPrice=5000&maxPrice=7000` | Filter cached results by price range |
| `GET /supplierA/hotels?city=delhi` | Mock Supplier A endpoint |
| `GET /supplierB/hotels?city=delhi` | Mock Supplier B endpoint |
| `GET /health` | Health check for Redis and suppliers |

## Setup & Deployment

### Using Docker Compose (Recommended)

```bash
docker-compose up --build
```

This starts Redis, Temporal, the API server (port 3000), and the Temporal worker.

### Local Development

Prerequisites: Redis running on port 6379, Temporal server running on port 7233.

```bash
npm install
npm run build
```

Start the server and worker in separate terminals:

```bash
npm start
npm run start:worker
```

Or for development with auto-reload:

```bash
npm run dev
npm run dev:worker
```

## How It Works

1. A request to `/api/hotels?city=delhi` triggers a Temporal workflow
2. The workflow calls Supplier A and Supplier B activities in parallel
3. Both suppliers return their hotel listings for the requested city
4. The workflow deduplicates hotels by name, keeping the cheaper option
5. Results are cached in Redis using sorted sets (scored by price)
6. Subsequent requests with `minPrice`/`maxPrice` query Redis directly using `ZRANGEBYSCORE`

## Testing

Import `tripare.postman_collection.json` into Postman to run the included test cases:

- Valid city with overlapping hotels (delhi, mumbai)
- City with no results (goa)
- Price range filtering
- Individual supplier endpoints
- Health check
- Missing required parameters
