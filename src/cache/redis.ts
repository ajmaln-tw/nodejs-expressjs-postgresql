import redis from "redis";

// Create a Redis client
export const client = redis.createClient();

// Handle any Redis connection errors
client.on('error', (err) => {
    console.error('Redis connection error:', err);
});
