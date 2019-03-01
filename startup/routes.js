const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');

// Routes
const home = require('../routes/index');
const signup = require('../routes/signup');
const login = require('../routes/login');
const logout = require('../routes/logout');

module.exports = function (app) {
    // Setting up view engine
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/../views');
    app.use(express.static('public'));

    // Setting up Passport
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({ secret: 'mySecret', resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    app.use(function(req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });

    // Custom Routes
    app.use('/', home);
    app.use('/signup', signup);
    app.use('/login', login);
    app.use('/logout', logout);
}