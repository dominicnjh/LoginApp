const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const { User, validate } = require('../models/user');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        req.flash('error_msg', 'Missing input(s).');
        return res.status(400).redirect('/signup');
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
        req.flash('error_msg', 'Username has been taken. Please select another username.');
        return res.status(400).redirect('/signup');
    }

    user = await User.findOne({ email: req.body.email });
    if (user) {
        req.flash('error_msg', 'Email is registered.');
        return res.status(400).redirect('/signup');
    }

    user = new User(_.pick(req.body, ['firstName', 'lastName', 'username', 'password', 'email']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    req.flash('success_msg', 'You\'ve successfully created an account with us! You may now proceed to log into our portal to use the apps!');

    res.redirect('/login');
});

module.exports = router;