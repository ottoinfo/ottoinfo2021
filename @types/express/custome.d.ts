import { Express } from 'express-serve-static-core'

declare module 'express-serve-static-core' {
  interface Request {
    endpoint: string
    userExists: any
  }
}

// declare namespace Express {
//   interface Request {
//     endpoint: string
//   }
// }
