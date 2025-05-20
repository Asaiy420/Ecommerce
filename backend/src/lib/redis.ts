
import "dotenv/config"
import RedisModule from "ioredis";

const Redis = RedisModule.default;

export const redis = new Redis(process.env.UPSTASH_REDIS_URL!);

await redis.set('foo', 'bar');
