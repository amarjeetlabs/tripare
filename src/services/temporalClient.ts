import { Connection, Client } from "@temporalio/client";

let client: Client | null = null;

async function getClient(): Promise<Client> {
  if (!client) {
    const connection = await Connection.connect({
      address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
    });
    client = new Client({ connection });
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
