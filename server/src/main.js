// @flow

import {createServer} from 'http';
import createRouter from './helpers/createRouter';
import productController from './controllers/product-controller';
import mainController from './controllers/main-controller';

const PORT = 3000;

let server = createServer();

server.on('listening', () => {
  console.log(`The HTTP server listening on http://localhost:${PORT}`);
});

server.on('request', (request, response) => {
  let router = createRouter(request, response);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  router.addRoute('/products', productController.showProducts);
  router.addRoute('/products/add', productController.addProduct);
  router.addRoute('/products/:id/edit', productController.editProduct);
  router.addRoute('/products/:id/delete', productController.deleteProduct);
  router.onNotFound(mainController.onNotFound);
  router.route(request.url);
});

server.listen(PORT);
