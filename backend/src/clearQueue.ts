import { emailQueue } from "./queues/emailQueue";

async function clear() {
  await emailQueue.obliterate({ force: true });
  console.log("Queue Cleared");
  process.exit(0);
}

clear();