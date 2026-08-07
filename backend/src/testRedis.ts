import { connection } from "./config/redis";

async function test() {
  await connection.set("test", "working");

  const value = await connection.get("test");

  console.log(value);

  process.exit(0);
}

test();