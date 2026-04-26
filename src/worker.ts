import { Worker, NativeConnection } from "@temporalio/worker";
import * as activities from "./activities/hotelActivities";

async function run() {
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS || "localhost:7233",
  });

  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve("./workflows/hotelWorkflow"),
    activities,
    taskQueue: "hotel-queue",
  });

  console.log("Temporal worker started");
  await worker.run();
}

run().catch((err) => {
  console.error("Worker failed:", err);
  process.exit(1);
});
