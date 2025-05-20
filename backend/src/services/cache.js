const Redis = require('ioredis');
const { redisUrl, cacheTTL } = require('../config');
const redis = new Redis(redisUrl);

const getCached = async (key) => {
  const data = await redis.get(key);
  if (data) console.log(`[CACHE HIT] ${key}`);
  else console.log(`[CACHE MISS] ${key}`);
  return data ? JSON.parse(data) : null;
};

const setCached = async (key, value, ttl = cacheTTL) => {
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
};

module.exports = { getCached, setCached };
