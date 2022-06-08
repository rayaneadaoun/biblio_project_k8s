module.exports = {
    serverRuntimeConfig: {
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://'+process.env.API_URL_FRONT+'/api' // development api
            : 'http://'+process.env.API_URL_FRONT+'/api' // production api
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://'+process.env.API_URL_BACK+':9191/:path*',
          },
        ]
      },
}


