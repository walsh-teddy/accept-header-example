const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCats = (request, response) => {
  const theCat = {
    name: 'Nibbles',
    age: 4,
  };

  const preferredAccept = request.headers.accept.split(',')[0];

  if (preferredAccept === 'application/json') {
    respond(request, response, JSON.stringify(theCat), preferredAccept);
  }
  else if (preferredAccept === 'text/xml') {
    const dataToSend = `
      <response>
        <name>${theCat.name}</name>
        <age>${theCat.age}</age>
      </response>
    `.trim();

    respond(request, response, dataToSend, preferredAccept);
  }
};

module.exports = {
  getCats,
  getIndex,
};
