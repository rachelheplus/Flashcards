const path = require('path');
const express = require('express');
const apiRouter = require('./apiRouter.js');
const authRouter = require('./authRouter.js');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const session = require('express-session'); // required for oauth session

const { SESSION_SECRET } = process.env;
const app = express();
const PORT = 8080;

// session middle parses the oauth jwt
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.authenticate('session'));

// required for post data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// To get around CORS we normally set response header Access-Control-Allow-Origin --> '*'
// For example:
//      app.use((req, res, next) => {
//        res.header('Access-Control-Allow-Origin', 'http://localhost:5000/');
//        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//        res.header('Access-Control-Allow-Headers', 'Content-Type');
//        next();
//      });
// However, when ussing cookies many browsers do not allow Access-Control-Allow-Origin '*'
// Instead, we use the 'cors' npm module.
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).redirect('http://localhost:3000/');
});

app.get('/library', (req, res) => {
  res.status(200).redirect('http://localhost:3000/library');
});

// routers
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
