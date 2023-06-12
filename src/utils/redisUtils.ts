import { promisify } from 'util';


type RedisGetAsync = (key: string) => Promise<string | null>;
type RedisSetAsync = (key: string, value: string, ...args: any[]) => Promise<string>;

const redisGetAsync: RedisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync: RedisSetAsync = promisify(redisClient.set).bind(redisClient);
