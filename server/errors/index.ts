const { APP_ENV, NODE_ENV } = process.env
const isDev = NODE_ENV === 'development' || APP_ENV === 'local'

// Constants for ERRORS
export const ERRORS = {
  API: 'ApiError',
  DATABASE: 'DatabaseError',
  UNKNOWN_API: 'UnknownAPIError',
  UNKNOWN_ROUTE: 'UnknownRouteError',
  XSS_ATTACK: 'XSSAttackError',
}

export const MESSAGES = {
  API: 'Error on API',
  DATABASE: 'Error Database',
  UNKNOWN_API: 'Error Unknown API URL',
  UNKNOWN_ROUTE: 'Error Unknown Route URL',
  XSS_ATTACK: 'Invalid characters in route/path',
}

interface CustomError extends Error {
  endpoint: string
  data: any
}

// https://nodejs.org/api/errors.html
class CustomError extends Error {
  constructor(data: CustomError) {
    const { message } = data
    super(message)
    // Object.setPrototypeOf(this, CustomError.prototype)
    Object.setPrototypeOf(this, new.target.prototype)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    // We ONLY want logging turned on ALWAYS for DEVELOP, otherwise override for ENV/ERRORS when needed
    this.data = { log: !!isDev, slack: false }
  }
}

export class ApiError extends CustomError {
  constructor(data: any) {
    const { endpoint, message } = data
    data.message = `${MESSAGES.API}: ${endpoint || 'Unknown Endpoint'}${
      message ? `: ${message}` : ''
    }`
    super(data)
    this.data = { ...this.data, type: ERRORS.API, ...data }
  }
}

export class DatabaseError extends CustomError {
  constructor(data: any) {
    const { endpoint, message } = data
    data.message = `${MESSAGES.DATABASE}: ${endpoint || 'Unknown Endpoint'}${
      message ? `: ${message}` : ''
    }`
    super(data)
    this.data = { ...this.data, type: ERRORS.DATABASE, ...data }
  }
}

export class UnknownAPIError extends CustomError {
  constructor(data: any) {
    const { endpoint, message } = data
    data.message = `${MESSAGES.UNKNOWN_API}: ${endpoint || 'Unknown Endpoint'}${
      message ? `: ${message}` : ''
    }`
    super(data)
    this.data = { ...this.data, type: ERRORS.UNKNOWN_API, ...data }
  }
}

export class UnknownRouteError extends CustomError {
  constructor(data: any) {
    const { endpoint, message } = data
    data.message = `${MESSAGES.UNKNOWN_ROUTE}: ${endpoint || 'Unknown Endpoint'}${
      message ? `: ${message}` : ''
    }`
    super(data)
    this.data = { ...this.data, type: ERRORS.UNKNOWN_ROUTE, ...data }
  }
}

export class XSSAttackError extends CustomError {
  constructor(data: any) {
    const { endpoint, message } = data
    data.message = `${MESSAGES.XSS_ATTACK}: ${endpoint || 'Unknown Endpoint'}${
      message ? `: ${message}` : ''
    }`
    super(data)
    this.data = { ...this.data, log: true, type: ERRORS.XSS_ATTACK, ...data }
  }
}

export default CustomError
