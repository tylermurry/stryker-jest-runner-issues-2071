jest.doMock('node-fetch', () => require('fetch-mock').sandbox());

const fetch = require('node-fetch');
const { request } = require('./request-service');

describe('Request Service Tests', () => {
  beforeEach(() => fetch.reset());

  it('should return the correct JSON response for a GET request with no options', async () => {
    fetch.get('http://someurl.com/', { some: 'get data' });

    expect(await request('http://someurl.com/')).toMatchSnapshot();
  });

  it('should return an empty body for a no-content response', async () => {
    fetch.get('http://someurl.com/', 204);

    expect(await request('http://someurl.com/')).toMatchSnapshot();
  });

  it('should return the correct JSON response for a POST request with options', async () => {
    fetch.post('http://someurl.com/', { some: 'post data' });

    expect(await request('http://someurl.com/', { method: 'POST', body: 'something' })).toMatchSnapshot();
  });

  it('should return the correct error payload if the request fails', async () => {
    fetch.get('http://someurl.com/', { status: 500, body: 'some error message' });

    await expect(request('http://someurl.com/')).rejects.toThrowErrorMatchingSnapshot();
  });

  it('should return the correct error payload if the request fails and masks the authorization header properly', async () => {
    fetch.get('http://someurl.com/', { status: 500, body: 'some error message' });

    await expect(request(
      'http://someurl.com/',
      { headers: { Authorization: "Bearer sometoken" }}
    )).rejects.toThrowErrorMatchingSnapshot();
  });
});
