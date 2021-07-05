const secondsPerDay = 60 * 60 * 24
const defaultExpiration = 31

export const dateToPST = () => {
  const date = new Date()
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000
  return Math.floor(utcTime / 1000) // Convert to SQL Timestamp
}

// Get Cookie From Server or Browser
export const getCookie = ({ req, name }: any) => {
  if (req && req.cookies) {
    return req.cookies[name]
  }
  return ''
}

// Create/Renew Cookies
export const setCookie = (params: any) => {
  const { req, res, name, value, expiration } = params
  const maxAge = (expiration || defaultExpiration) * secondsPerDay * 1000
  const cookieValue = typeof value === 'function' ? value() : value || ''
  if (req && res) {
    res.cookie(name, cookieValue, {
      domain: `.ottoinfo.com`,
      maxAge,
      secure: true,
    })
  }
  return cookieValue
}

// APIs don't always pass back Objects Ordered, so Helpers
// Ex -> countries: {us: 'United States', cv: 'Cape Veder', uk: 'United Kindom', ca: 'Canada' }
// Result -> countries: { ca: 'Canada', cv: 'Cape Veder', uk: 'United Kindom', us: 'United States' }
export const sortObjectByKeys = (obj: any = {}) => {
  const orderedObject = {}
  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    .forEach((key) => (orderedObject[key] = obj[key]))
  return orderedObject
}

// Ex -> categories: { 0: 'Paintings', 1: 'Sculpture', 2: 'Drawings' }
// Result -> categories: { 2: 'Drawings', 0: 'Paintings', 1: 'Sculpture' }
export const sortObjectByValues = (obj: any = {}) => {
  const orderedObject = {}
  Object.keys(obj)
    .sort((a, b) => (obj[a] > obj[b] ? 1 : -1))
    .forEach((key) => (orderedObject[key] = obj[key]))
  return orderedObject
}

export const objectToQueryString = (obj: any = {}) =>
  Object.keys(obj)
    .map((key) => (obj[key] ? `${key}=${obj[key]}` : '')) // We are going to strip EMPTY values
    .filter(Boolean)
    .join('&')
