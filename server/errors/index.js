import Logger from'./logger'
import { parsePaletteErrorsForClient }  from '../apis/helpers'

const { APP_ENV, NODE_ENV } = process.env
const isDev = NODE_ENV === 'development' || APP_ENV === 'local'

// Constants for ERRORS
export const ERRORS = {
  API: 'ApiError',
  UNKNOWN_API: 'UnknownAPIError',
  XSS_ATTACK: 'XSSAttackError',
}

export const MESSAGES = {
  UNKNOWN_API: 'Error Unknown API URL',
  XSS_ATTACK: 'Invalid characters in route/path',
}

// https://nodejs.org/api/errors.html
class CustomError extends Error {
  constructor(data) {
    // data:Object = { message, data, ...etc}
    super(data)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    // We ONLY want logging turned on ALWAYS for DEVELOP, otherwise override for ENV/ERRORS when needed
    this.data = { log: !!isDev, slack: false }
  }
}


export class ApiError extends CustomError {
  constructor(data) {
    const { endpoint } = data
    super(`${MESSAGES.API}: ${endpoint || 'Unknown Endpoint'}`)
    this.data = { ...this.data, type: ERRORS.API, ...data }
  }
}

export class UnknownAPIError extends CustomError {
  constructor(data) {
    const { endpoint } = data
    super(`${MESSAGES.UNKNOWN_API}: ${endpoint || 'Unknown Endpoint'}`)
    this.data = { ...this.data, type: ERRORS.UNKNOWN_API, ...data }
  }
}

export class XSSAttackError extends CustomError {
  constructor(data) {
    const { endpoint } = data
    super(`${MESSAGES.XSS_ATTACK}: ${endpoint || 'Unknown Endpoint'}`)
    this.data = { ...this.data, log: true, type: ERRORS.XSS_ATTACK, ...data }
  }
}
