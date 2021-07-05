import Logger from '../middleware/logger'

// API Helper for making sure all Fetch calls handles JSON the same way
export const successPayload = { payload: {}, success: true }

export const errorPayload = { payload: {}, success: false }

export const invalidSessionResponse = {
  payload: {},
  loginRequired: true,
  success: false,
}

export const jsonOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const getOptions = { method: 'GET', credentials: 'include' }

export const postOptions = { ...jsonOptions, method: 'POST' }

export const putOptions = { ...jsonOptions, method: 'PUT' }

export const deleteOptions = { ...jsonOptions, method: 'DELETE' }

export const parseJSON = async (response: any, api: string, defaultResponse: any) => {
  try {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const json = await response.json()
      return json
    } else {
      // Handle NON JSON response
      const text = await response.text()
      return { body: text || '' }
    }
  } catch (error) {
    const { name, message, type } = error
    Logger.error(`ParseJSON ( via Middleware ) Error ${api || 'API:Unknown'}`, {
      error,
      name,
      message,
      type,
    })
    // Lets add a `status` to let the FRONTEND know that the API is BAD and pass along the error message
    return (
      defaultResponse || {
        ...errorPayload,
        status: 'invalidJSON',
        message: error.message || 'invalid json response body',
      }
    )
  }
}
