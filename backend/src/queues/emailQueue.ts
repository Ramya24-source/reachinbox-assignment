import { Queue } from "bullmq";
import { connection } from "../config/redis";

export const emailQueue = new Queue("emails", {
  connection,
});