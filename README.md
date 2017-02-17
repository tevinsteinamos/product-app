# product-app

A simple product management app using React &amp; Redux 📦

![](http://i.imgur.com/zJi2vTz.gif)

![](http://i.imgur.com/5eWSdKj.gif)

This is my Kodefox's practice for client/server app using:
- [Node.js 6+](https://nodejs.org/en/ "Node.js 6+")
- [React](https://facebook.github.io/react/ "React")
- [Redux](http://redux.js.org/docs/introduction/ "Redux")
- [Grommet](https://grommet.github.io/ "Grommet")

Clone repository `git clone https://github.com/tevinstein/coolest-product-app.git`

## Server
#### Installation
- Go to server directory: `cd server`
- Install packages: `npm install`
- Run the server: `npm start`
- Server is located on: `http://localhost:3000`

#### REST API
| URL                     | Method | Description                 |
|-------------------------|--------|-----------------------------|
| /products              | GET    | Show all product from file *products.json*         |
| /products/add          | POST   | Add a product data and update file *products.json*      |
| /products/:id/edit   | POST   | Edit a product data and and update file *products.json*       |
| /products/:id/delete | GET    | Delete a product data and and update file *products.json*          |

## Client
#### Installation
- Run server: *See Server Installation*
- Go to client directory: `cd client`
- Install packages: `npm install`
- Run application: `npm start`
- Access the app on your browser: `http://localhost:8080`
