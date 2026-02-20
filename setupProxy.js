const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://clientform.simplyfound.com.na',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
    })
  );
};

