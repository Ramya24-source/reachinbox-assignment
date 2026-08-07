import { emailQueue } from "./queues/emailQueue";

async function test() {
  await emailQueue.add(
    "send-email",
    {
      email: "test@gmail.com",
      subject: "Hello",
    },
    {
      delay: 5000,
    }
  );

  console.log("Job Added");
  process.exit(0);
}

test();