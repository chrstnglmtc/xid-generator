import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api/convert', createProxyMiddleware({
  target: 'https://tweethunter.io',
  changeOrigin: true,
  pathRewrite: {
    '^/api/convert': '/api/convert', // Remove /api/convert prefix when forwarding
  },
  onProxyReq: (proxyReq, req, res) => {
    // Existing headers
    proxyReq.setHeader('accept', '*/*');
    proxyReq.setHeader('accept-language', 'en-US,en;q=0.9');
    proxyReq.setHeader('cookie', '_ga_F7Q3BYCL54=GS1.1.1711930018.1.0.1711930060.0.0.0; _ga=GA1.1.136415787.1711930018; __kla_id=eyJjaWQiOiJaakprTkRZeU9UUXRNelkzTkMwME56TmlMVGcxTVRVdFl6Z3pZalUxWlRJMllUWTMiLCIkcmVmZXJyZXIiOnsidHMiOjE3MTg4NDI5OTIsInZhbHVlIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJmaXJzdF9wYWdlIjoiaHR0cHM6Ly90d2VldGh1bnRlci5pby8ifSwiJGxhc3RfcmVmZXJyZXIiOnsidHMiOjE3MTg4NDI5OTIsInZhbHVlIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJmaXJzdF9wYWdlIjoiaHR0cHM6Ly90d2VldGh1bnRlci5pby8ifX0=; __Host-next-auth.csrf-token=08be6598d91e2201ac0c3c16bdd2fa5448b0981a6b82219cbd31c26ac0303466%7C236d6503008b4e647b0a2334417dbe1ccd94fb537b202c0e052e7f412853e6e6; __Secure-next-auth.callback-url=https%3A%2F%2Fapp.tweethunter.io; amp_724fdb=veUZTlCeXN8iRJUVMQHuf6...1i0pgsjhf.1i0pgsjhf.0.0.0; amp_724fdb_tweethunter.io=veUZTlCeXN8iRJUVMQHuf6...1i0pgsjhf.1i0pgsjuq.0.0.0; _ga_BH3EC90N3P=GS1.1.1719182372.4.0.1719182372.60.0.0');
    proxyReq.setHeader('priority', 'u=1, i');
    proxyReq.setHeader('referer', 'https://tweethunter.io/twitter-id-converter');
    proxyReq.setHeader('sec-ch-ua', '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"');
    proxyReq.setHeader('sec-ch-ua-mobile', '?0');
    proxyReq.setHeader('sec-ch-ua-platform', '"Windows"');
    proxyReq.setHeader('sec-fetch-dest', 'empty');
    proxyReq.setHeader('sec-fetch-mode', 'cors');
    proxyReq.setHeader('sec-fetch-site', 'same-origin');
    proxyReq.setHeader('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
  },
  onProxyRes: (proxyRes, req, res) => {
    // Set CORS headers on the proxy response
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Adjust as needed
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

    // Optionally, log the headers of the proxied response
    console.log('Proxy Response Headers:', proxyRes.headers);
  }
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
