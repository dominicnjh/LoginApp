const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

const home = require('../routes/index');
const signup = require('../routes/signup');
const login = require('../routes/login');

module.exports = function (app) {
    // Setting up view engine
    app.set('view engine', 'ejs');
    app.use(express.static('public'));

    // Setting up Passport
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    // Custom Routes
    app.use('/', home);
    app.use('/signup', signup);
    app.use('/login', login);
}