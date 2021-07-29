import Promise from "bluebird";
import * as Redis from "redis";

declare module "redis" {
  export interface RedisClient extends NodeJS.EventEmitter {
    hsetAsync(...args: any[]): Promise<any>;
    hmsetAsync(...args: any[]): Promise<any>;
    hgetAsync(...args: any[]): Promise<any>;
    hgetallAsync(...args: any[]): Promise<any>;
    hdelAsync(...args: any[]): Promise<any>;
  }
}

const config = {
  host: process.env.REDIS_HOST || "localhost",
  port: (process.env.REDIS_PORT as unknown as number) || 6379,
  retry_strategy: function retry(options: any) {
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
  },
};
const keys = {
  messages: "messages",
};
const client = Promise.promisifyAll(
  Redis.createClient(config)
) as Redis.RedisClient;

try {
  client.on("connect", () => {
    console.log("Connected to Redis");
  });
  client.on("error", (err: any) => {
    console.error("Error:", err);
  });
} catch (err) {
  console.error("General error:", err);
}

export default client;
export { config, keys };
