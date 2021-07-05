import { NextFunction, Request, Response } from 'express'
import { errorPayload } from '../helpers/api'
import CustomError, { ERRORS } from '../errors'
import Logger from './logger'

const { APP_ENV, NODE_ENV } = process.env
const isDev = NODE_ENV === 'development' || APP_ENV === 'local'

const baseErrorHandlerMiddle = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // End early if REQUEST is already SENT
  if (res.headersSent) {
    console.log(`Header sent ${res.headersSent}`)
  }
  next(error)
}

const apiErrorHandlerMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, data } = error
    const { message, statusCode } = data || {}
    Logger.debug({ name, data, message, statusCode })
    switch (name) {
      case ERRORS.API:
        return res.status(statusCode || 404).json({
          ...errorPayload,
          ...(message ? { message } : {}),
          ...(isDev ? { error } : {}), // Show as much INFORMATION as possible in DEVELOPMENT
        })
      case ERRORS.UNKNOWN_API:
        return res.status(500).json({ ...errorPayload, message: 'Unknown API Endpoint' })
      case ERRORS.XSS_ATTACK:
        return res.redirect(301, '/')
      default:
        // Type - CustomError || Error
        return res.status(500).send(errorPayload)
    }
  } catch (err) {
    return next(error)
  }
}

export default [baseErrorHandlerMiddle, apiErrorHandlerMiddleware]
