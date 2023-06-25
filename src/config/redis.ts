import * as Redis from 'redis';


class Cache {
  redis:any
  constructor() {
    this.redis = null;
  }

  async connect() {
    try {
      this.redis =  await Redis.createClient();

      this.redis.connect();

      this.redis.on('connect', () => {
        console.log('Redis connected');
      });

      this.redis.on('error', (error: Error) => {
        console.log('Redis connection error:', error);
      });
    } catch (error) {
      console.log(error);
    }
  }
}


const instance = new Cache();

export default instance;
