import Redis from 'ioredis';

const redis = new Redis(process.env.REDISS_URL!);

export default redis;
