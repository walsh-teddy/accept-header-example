const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Create a dictionary of the possible pages to search through easily
const routes = {
  '/': responseHandler.getIndex,
  '/cats': responseHandler.getCats,
  index: responseHandler.getIndex, // Default
};

const onRequest = (request, response) => {
  console.log(request.url);

  // Find the proper callback function
  const thePropperRoute = routes[request.url] || routes.index;

  thePropperRoute(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
