import esbuild from 'esbuild';
import dotenv from 'dotenv';
import http from 'http';
import { websiteEsbuildConfig } from './esbuild.config';

dotenv.config();

const publicPort = 3000;
const internalPort = 9998;

const startServer = () => {
  http
    .createServer((req, res) => {
      const fileRequested = req.url.includes('.');
      const proxyReq = http.request(
        {
          hostname: 'localhost',
          port: internalPort,
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
      console.info(`\nStarted on http://localhost:${publicPort}\n`);
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

      // plugins: [
      //   ...websiteEsbuildConfig.plugins,
      // cssModulesPlugin({
      //   inject: true,
      //   v2: true,
      //   cssModulesOption: {
      //     generateScopedName: '[path][name]__[local]___[hash:base64:8]',
      //   },
      // }),
      // ],
    },
  )
  .then(() => {
    startServer();
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
