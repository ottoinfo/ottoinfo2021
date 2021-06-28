import { ERRORS } from '../errors'

const errorHandlerMiddleware = (error, req, res, next) => {
  const { name, data } = error
  const { message, statusCode } = data || {}
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
}

export default errorHandlerMiddleware
