import express from 'express'

const nextRoutes = (nextApp) => {
  const router = express.Router()

  // NextJS Files /_next/( PAGE, _error, main ).js
  router.get('/_next/*', (req, res) => {
    nextApp.getRequestHandler()(req, res)
  })

  // Updated Starter App (created JUNE 2020 )
  router.get('/next', (req, res, next) => {
    try {
      return nextApp.render(req, res, '/test', {
        ...req.params,
        ...req.query,
      })
    } catch (error) {
      return next(error)
    }
  })

  return router
}

export default nextRoutes
