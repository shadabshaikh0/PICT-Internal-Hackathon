const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const sass = require('node-sass-middleware');
const multer = require('multer');
const cookieParser = require('cookie-parser')
const upload = multer({
  dest: path.join(__dirname, 'uploads')
});
dotenv.config();

/**
 * Create Express server.
 */
const app = express();
/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1209600000
  }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));


app.use('/', express.static(path.join(__dirname, '/public'), {
  maxAge: 31557600000
}));
app.use('/public/js', express.static(path.join(__dirname, '/public/js/'), {
  maxAge: 31557600000
}));

/**
 * Primary app routes.
 */

app.use(cookieParser())

const routes = require('./routes');
app.use("/", routes);


if (process.env.NODE_ENV === 'development') {
  // only use in development
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

/**
 * Start Express server.
 */
// app.listen(app.get('port'), () => {
//   console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
//   console.log('  Press CTRL-C to stop\n');
// });


app.listen(process.env.PORT, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;