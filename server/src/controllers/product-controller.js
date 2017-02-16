//@flow

import parseRequestBody from '../helpers/parseRequestBody';
import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(__dirname, '../products.json');

export default {
  showProducts: (request, response) => {
    let data;
    let readStream = fs.createReadStream(PRODUCTS_FILE);
    readStream
      .on('error', (error) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({success: false, message: error}));
      })
      .on('data', (chunk) => {
        data = JSON.parse(chunk);
      })
      .on('end', () => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({success: true, data}));
      });
  },
  addProduct: (request, response) => {
    parseRequestBody(request, (error, body) => {
      if (error) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({success: false, message: error.message}));
      } else {
        let data;
        let readStream = fs.createReadStream(PRODUCTS_FILE);
        readStream
          .on('error', (error) => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({success: false, message: error}));
          })
          .on('data', (chunk) => {
            data = JSON.parse(chunk);
          })
          .on('end', () => {
            let writeStream = fs.createWriteStream(PRODUCTS_FILE);
            let newData = {
              id: Date.now().toString(),
              name: (body && body.name) ? body.name : '',
              image: (body && body.image) ? body.image : '',
              description: (body && body.description) ? body.description : '',
            };
            data.push(newData);
            writeStream.write(JSON.stringify(data, null, 2));
            writeStream.end(() => {
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify({success: true, message: 'Data is added!', newData}));
            });
          });
      }
    });
  },
  editProduct: (request, response, id) => {
    parseRequestBody(request, (error, body) => {
      if (error) {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({success: false, message: error.message}));
      } else {
        let data;
        let readStream = fs.createReadStream(PRODUCTS_FILE);
        readStream
          .on('error', (error) => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({success: false, message: error}));
          })
          .on('data', (chunk) => {
            data = JSON.parse(chunk);
          })
          .on('end', () => {
            let writeStream = fs.createWriteStream(PRODUCTS_FILE);
            let index = data.findIndex((product) => (product.id === id));
            let newData = {
              id: data[index].id,
              name: (body && body.name) ? body.name : data[index].name,
              image: (body && body.image) ? body.image : data[index].image,
              description: (body && body.description) ? body.description : data[index].description,
            };
            data[index] = newData;
            writeStream.write(JSON.stringify(data, null, 2));
            writeStream.end(() => {
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify({success: true, message: 'Data is edited!', newData}));
            });
          });
      }
    });
  },
  deleteProduct: (request, response, id) => {
    let data;
    let readStream = fs.createReadStream(PRODUCTS_FILE);
    readStream
      .on('error', (error) => {
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify({success: false, message: error}));
      })
      .on('data', (chunk) => {
        data = JSON.parse(chunk);
      })
      .on('end', () => {
        let writeStream = fs.createWriteStream(PRODUCTS_FILE);
        let newData = data.filter((product) => (id !== product.id));
        writeStream.write(JSON.stringify(newData, null, 2));
        writeStream.end(() => {
          response.setHeader('Content-Type', 'application/json');
          response.end(JSON.stringify({success: true, message: 'Data is deleted!'}));
        });
      });
  },
};
