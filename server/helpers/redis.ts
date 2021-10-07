import redis, { RedisClient } from 'redis'
import { promisify } from 'util'

const PORT: number = 6379
const HOST: string = `cache`

// client.on('error', (error) => {
//   console.error(error)
// })

class Singleton {
  client?: RedisClient

  getAsync?: Function

  setAsync?: Function

  constructor() {
    if (!this.client) {
      this.connect()
    }
  }

  connect = () => {
    this.client = redis.createClient(PORT, HOST)
    this.getAsync = promisify(this.client.get).bind(this.client)
    this.setAsync = promisify(this.client.set).bind(this.client)
  }

  get = (key: any) => {
    const data = this.getAsync(key, (err: Error, reply: any) => {
      if (err) throw err
      console.log({ reply })
      return reply
    })
    return data
  }

  set = (key: any, value: any) => {
    this.client.set(key, value, redis.print)
  }
}

const singleton = new Singleton()
export default singleton

// function func() {
//   return new Promise((resolve, reject) => {
//     client.hgetall("myhash", (err, data) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(data);
//     });
//   });
// }

// async function main() {
//   const data = await func();
//   console.log(data);
// }
