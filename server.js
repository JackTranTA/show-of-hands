// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['cookie'],
  maxAge: 12 * 60 * 60 * 60 // session expires after 12 hours
}))

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const indexRoutes = require('./routes/index-routes');
const adminRoutes = require('./routes/admin-routes');
const pollRoutes = require('./routes/poll-routes');
const voterRoutes = require('./routes/voter-routes');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/poll', pollRoutes);
app.use('/voter', voterRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
