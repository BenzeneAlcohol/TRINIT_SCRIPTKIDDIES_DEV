if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();

const mongoSanitize = require('express-mongo-sanitize');

const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');

const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//routes
const userRoutes = require('./routes/users');
const bugRoutes = require('./routes/bugs');
const teamRoutes = require('./routes/teams');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/tri-nit';
const secretCode = process.env.SECRET;

mongoose.connect(dbUrl).then(console.log('mongo success'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret: secretCode,
  touchAfter: 24 * 3600,
});

store.on('error', function (e) {
  console.log('session store error', e);
});

const sessionConfig = {
  store,
  name: 'tri-nit',
  secret: secretCode,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user || 0;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.current_url = req.url;
  next();
});
app.get('/', (req, res) => {
  res.render('home');
});
app.use('/teams', teamRoutes);
app.use('/teams/:id/bugs', bugRoutes);
app.use('/', userRoutes);
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'something went wrong' } = err;
  if (!err.message) err.message = 'Oh no,Something went wrong.';
  res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
