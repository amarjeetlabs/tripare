import { Connection, Client } from "@temporalio/client";

let client: Client | null = null;
let temporalDown = false;

async function getClient(): Promise<Client> {
  if (temporalDown) throw new Error("Temporal not available");
  if (!client) {
    try {
      const connection = await Promise.race([
        Connection.connect({
          address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Temporal connection timeout")), 2000)
        ),
      ]);
      client = new Client({ connection });
    } catch (err) {
      temporalDown = true;
      throw err;
    }
  }
  return client;
}

export async function startHotelWorkflow(city: string) {
  const c = await getClient();

  const handle = await c.workflow.start("hotelWorkflow", {
    args: [city],
    taskQueue: "hotel-queue",
    workflowId: `hotel-${city}-${Date.now()}`,
  });

  return handle.result();
}
