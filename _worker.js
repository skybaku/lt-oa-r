export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.host = "generativelanguage.googleapis.com";

    // 处理 CORS 预检请求（OPTIONS）
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "*",
        },
      });
    }

    // 复制原始请求 headers
    const newHeaders = new Headers(request.headers);
    newHeaders.set("Host", "generativelanguage.googleapis.com");

    // 转发请求
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: newHeaders,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : request.body,
      redirect: "follow",
    });

    // 返回响应并附加 CORS headers
    const res = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Headers", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

    return res;
  },
};
