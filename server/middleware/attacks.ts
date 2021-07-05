import { NextFunction, Request, Response } from 'express'
import { XSSAttackError } from '../errors'

// Return TRUE|FALSE if contains BAD/Invalid Characters
const regexSearch = (val: string = '') => String(val).search(/[&<>"']|%26|%3C|%3E|%22/g) > -1

// Replace Bad Values
const htmlEntities = (val: string = '') =>
  String(val)
    .replace(/&|%26/g, '&amp;')
    .replace(/<|%3C/g, '&lt;')
    .replace(/>|%3E/g, '&gt;')
    .replace(/"|%22/g, '&quot;')

// Take an Object and return CLEAN values
const cleanObject = (obj: Object) =>
  Object.entries(obj).reduce((data, [key, val]) => ({ ...data, [key]: htmlEntities(val) }), {})

// We want to prevent any bad URL Request ( XSS Attacks, SQL Injections, etc... )
// We will redirect to Homepage and Log URL
const invalidUrlQueries = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Lets Make sure QUERY Values don't have invalid HTML Characters
    const { originalUrl, query } = req
    if (originalUrl.search(/__nextjs/) > -1) {
      return next()
    }
    // Make Sure all VALUES are VALID
    if (
      Object.values(query)
        .map((value: any) => regexSearch(value))
        .filter(Boolean).length // 1 Bad Value ( atleast )
    ) {
      // BAD QUERY VALUES
      // TODO - ReWrite/Redirect URL Later
      throw new XSSAttackError({ endpoint: originalUrl })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

// We want to prevent any bad URL PARAMS ( XSS Attacks )
// Feature Pages Allow users to search `${category}/${search}/feature`
// Issue -> `/prints/<%2fscript><script>alert%28document.cookie%29<%2fscript>/feature`
// https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1---html-escape-before-inserting-untrusted-data-into-html-element-content
// We will just replace characters with html entities
const cleanRequestParams = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req
    req.params = cleanObject(params)
    next()
  } catch (error) {
    next(error)
  }
}

const cleanRequestRoute = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { originalUrl, path } = req
    if (regexSearch(path)) {
      throw new XSSAttackError({ endpoint: originalUrl })
    }
    next()
  } catch (error) {
    next(error)
  }
}

export default [cleanRequestRoute, cleanRequestParams, invalidUrlQueries]
