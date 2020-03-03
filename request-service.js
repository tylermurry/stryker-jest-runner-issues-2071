const fetch = require('node-fetch');

const request = async (url, options) => {
  const response = await doFetch(url, options);
  const body = await response.text();

  return {
    body: body ? JSON.parse(body): null,
    rawResponse: response
  }
};

const doFetch = async (url, options) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const error = JSON.stringify({
      request: {
        url: url,
        ...options && {
          options: {
            ...options,
            ...maskAuthorization(options.headers)
          }
        }
      },
      response: {
        status: response.status,
        body: await response.text(),
      }
    }, null, 2);

    throw Error(error);
  }

  return response;
};

const maskAuthorization = (headers) => headers && headers.Authorization && ({
  headers: { Authorization: '***' }
});

module.exports = { request };
