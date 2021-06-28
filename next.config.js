const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  // By default Next.js will add x-powered-by to the request headers. Lets opt-out of it
  poweredByHeader: false,
  // DEV mode only: https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode && https://reactjs.org/docs/strict-mode.html
  reactStrictMode: true,
  // Local Development
  webpackDevMiddleware: (config) => {
    // within VMWare you need to poll -> https://webpack.js.org/configuration/watch/
    if (isDevelopment) {
      config.watchOptions = {
        aggregateTimeout: 1000, // Add a delay before rebuilding once the first file changed
        ignored: [
          '/server/',
          '/node_modules/',
          '/.next/',
          '/.circleci/',
        ],
        poll: 1000 * 10, // Check for changes every second 10 seconds
      }
    }
    return config
  },
}
