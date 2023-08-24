const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 4000번 포트에서 endpoint에 /api가 있다면 이는 4000서버로 요청하며 changeOrigin을 허용한다.
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
