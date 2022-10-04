import esbuild from 'esbuild';
import dotenv from 'dotenv';
import http from 'http';
import { websiteEsbuildConfig } from './esbuild.config';
import picocolros from 'picocolors';

dotenv.config();

const publicPort = 3000;
const internalPort = 9998;

const startServer = (host: string, port: number) => {
  http
    .createServer((req, res) => {
      const fileRequested = req.url.includes('.');
      const proxyReq = http.request(
        {
          hostname: host,
          port,
          path: fileRequested ? req.url : '/',
          method: req.method,
          headers: req.headers,
        },
        (proxyRes) => {
          // console.log(proxyReq.path);
          if (proxyRes.statusCode === 404) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>404</h1>');
          } else {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
          }
        },
      );
      req.pipe(proxyReq, { end: true });
    })
    .listen(publicPort)
    .on('listening', () => {
      // eslint-disable-next-line no-console
      console.info(picocolros.green(`\nStarted on http://localhost:${publicPort}\n`));
    });
};

esbuild
  .serve(
    {
      servedir: './src/public',
      port: internalPort,
    },
    {
      ...websiteEsbuildConfig,
      outdir: './src/public',
      splitting: false,
    },
  )
  .then(async ({ host, port }) => {
    startServer(host, port);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    // process.exit(1);
  });
