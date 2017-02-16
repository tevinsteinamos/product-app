//@flow

export default {
  onNotFound: (request, response) => {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({message: 'Resource not found!'}));
  },
};
