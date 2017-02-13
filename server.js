require('app-module-path').addPath(__dirname);
require('marko/express');
require('marko/node-require');

function requireNoOp(module, filename) { /* no-op */ }

require.extensions['.less'] = requireNoOp;
require.extensions['.css'] = requireNoOp;

const express = require('express');
const compression = require('compression'); // Provides gzip compression for the HTTP response
const serveStatic = require('serve-static');

// If the process was started using browser-refresh then enable
// hot reloading for certain types of files to short-circuit
// a full process restart. You *should* use browser-refresh
// in development: https://www.npmjs.com/package/browser-refresh
require('marko/browser-refresh').enable();

const contentType = require('./middlewares/contentType');
const fs = require('fs');
const pages = fs.readdirSync('./src/pages');
const app = express();
const port = process.env.PORT || 8080;
// Enable gzip compression for all HTTP responses
app.use(compression());

// Allow all of the generated files under "static" to be served up by Express
app.use('/static', serveStatic(__dirname + '/static'));
app.use('/', serveStatic(__dirname + '/'));

//set content-type html
app.use(contentType);

// Map the "/" route to the home page
app.get(`/`, require(`src/pages/home`))

//map more routes to the router
pages.map(page => app.get(`/${page}`, require(`src/pages/${page}`)))

app.listen(port, function(err) {
  if (err) {
    throw err;
  }
  console.log('Listening on port %d', port);
  // The browser-refresh module uses this event to know that the
  // process is ready to serve traffic after the restart
  if (process.send) {
    process.send('online');
  }
});