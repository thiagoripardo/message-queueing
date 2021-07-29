import redis from 'redis';
import { promisifyAll } from 'bluebird';

const config = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT as unknown as number || 6379,
  retry_strategy: function retry(options: any) {
    if (options?.error?.code === 'ECONNREFUSED') {
      console.error('Connection Refused', options);
    }
    if (options?.total_retry_time > 1000 * 60 * 60) {
      console.error('Retry time', options);
    }
    if (options?.attempt > 10) {
      console.error('Many attempts', options);
    }

    return Math.min(options?.attempt * 100, 3000);
  },
};
const client = promisifyAll(redis.createClient(config));

try {
  client.on('connect', () => {
    console.log('Connected to Redis');
  });
  client.on('error', (err: any) => {
    console.error('Error:', err);
  });
} catch (err) {
  console.error('General error:', err);
}

export default client;
export { config };
