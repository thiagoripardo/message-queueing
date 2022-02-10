import { createClient } from "redis";

const retryStrategy = function retry(options: any) {
  if (options?.error?.code === "ECONNREFUSED") {
    console.error("Connection Refused", options);
  }
  if (options?.total_retry_time > 1000 * 60 * 60) {
    console.error("Retry time", options);
  }
  if (options?.attempt > 10) {
    console.error("Many attempts", options);
  }

  return Math.min(options?.attempt * 100, 3000);
};

const host = process.env.REDIS_HOST ?? "localhost";
const port = (process.env.REDIS_PORT as unknown as number) ?? 6379;
const config = {
  url: `redis://:@${host}:${port}`,
};
const keys = {
  messages: "messages",
};

const redisBullConfig = {
  host,
  port,
  retryStrategy,
};

const client = createClient(config);

(async () => {
  client.on("error", (err) => console.log("Redis Client Error", err));
  client.on("ready", () => console.log("Redis Connected"));
  await client.connect();
})();

export default client;
export { redisBullConfig, keys };
