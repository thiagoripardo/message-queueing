import _ from "lodash";
import client, { keys } from "configs/redis";

export default class RedisService {
  public async hset(key: any, subkey: any, value: any): Promise<number> {
    return client.hSet(String(key), String(subkey), JSON.stringify(value));
  }

  public async hmset(key: any, values: any): Promise<number> {
    return client.hSet(String(key), values);
  }

  public async hget(key: string, subkey: string): Promise<JSON | undefined> {
    const result = await client.hGet(key, subkey);

    if (result) return JSON.parse(result);

    return;
  }

  public async hgetall(key: any): Promise<any[] | null> {
    const results = await client.hGetAll(String(key));
    if (!_.isEmpty(results)) {
      return Object.keys(results).map((key) => {
        let result = JSON.parse(results[key]);
        if (result) {
          return result;
        }
      });
    } else {
      return null;
    }
  }

  public async hdel(key: any, subkey: any): Promise<number> {
    return client.hDel(String(key), String(subkey));
  }

  public getKeys() {
    return keys;
  }
}
