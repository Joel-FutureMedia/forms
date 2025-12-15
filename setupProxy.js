const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8383',
      changeOrigin: true,
      secure: true,
      logLevel: 'debug',
    })
  );
};

