const bcrypt = require('bcrypt');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');
const router = express.Router();

passport.use(new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, req.flash('error_msg', 'Incorrect username or password.'));
        }

        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) { return done(err); }
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, req.flash('error_msg', 'Incorrect username or password.'));
            }
        });
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;