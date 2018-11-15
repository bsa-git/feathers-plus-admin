
const assert = require('assert');
const rp = require('request-promise');
const url = require('url');
const app = require('../src/app');

const port = app.get('port') || 3030;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

describe('=== Feathers application tests ===', () => {
  let server;

  before(function (done) {
    server = app.listen(port);
    server.once('listening', () => {
      setTimeout(() => done(), 500);
    });
  });

  after(function (done) {
    server.close();
    setTimeout(() => done(), 500);
  });

  it('starts and shows the index page', () => {
    return rp(getUrl()).then(body =>
      assert.ok(body.indexOf('<html>') !== -1, 'response does not contain <html>')
    );
  });

  describe('--- 404 ---', function () {
    it('shows a 404 HTML page', () => {
      return rp({
        url: getUrl('path/to/nowhere'),
        headers: {
          Accept: 'text/html'
        }
      }).catch(res => {
        assert.strictEqual(res.statusCode, 404, 'unexpected statusCode');
        assert.ok(res.error.indexOf('<html>') !== -1, 'error does not contain <html>');
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: getUrl('path/to/nowhere'),
        json: true
      }).catch(res => {
        assert.strictEqual(res.statusCode, 404, 'unexpected statusCode');
        assert.strictEqual(res.error.code, 404, 'unexpected error.code');
        assert.strictEqual(res.error.message, 'Page not found', 'unexpected error.message');
        assert.strictEqual(res.error.name, 'NotFound', 'unexpected error.name');
      });
    });
  });

  describe('--- Test authentication config ---', function () {
    const config = app.get('authentication');
    it('Set config.authentication.local.usernameField = "email"', () => {
      assert.ok(config.local.usernameField === 'email', 'config.local.usernameField does not match the value "email"');
    });
    it('Set config.authentication.google.clientID', () => {
      assert.ok(config.google.clientID === process.env.GOOGLE_ID, 'config.authentication.google.clientID does not match the value "process.env.GOOGLE_ID"');
    });
    it('Set config.authentication.google.clientSecret', () => {
      assert.ok(config.google.clientSecret === process.env.GOOGLE_SECRET, 'config.authentication.google.clientSecret does not match the value "process.env.GOOGLE_SECRET"');
    });
    it('Set config.authentication.github.clientID', () => {
      assert.ok(config.github.clientID === process.env.GITHUB_ID, 'config.authentication.github.clientID does not match the value "process.env.GITHUB_ID"');
    });
    it('Set config.authentication.github.clientSecret', () => {
      assert.ok(config.github.clientSecret === process.env.GITHUB_SECRET, 'config.authentication.github.clientSecret does not match the value "process.env.GITHUB_SECRET"');
    });
  });
});
