import client, { keys } from "configs/redis";

export default class RedisService {
  public async hset(key: any, subkey: any, value: any): Promise<void> {
    await client.hsetAsync(String(key), String(subkey), JSON.stringify(value));
  }

  public async hmset(key: any, values: any): Promise<void> {
    await client.hmsetAsync(String(key), values);
  }

  public async hget(key: any, subkey: any): Promise<JSON> {
    return JSON.parse(await client.hgetAsync(String(key), String(subkey)));
  }

  public async hgetall(key: any): Promise<any[] | null> {
    let results = await client.hgetallAsync(String(key));
    if (results) {
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

  public async hdel(key: any, subkey: any) {
    await client.hdelAsync(String(key), String(subkey));
  }

  public getKeys() {
    return keys;
  }
}
