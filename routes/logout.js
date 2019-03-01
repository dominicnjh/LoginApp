const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You\'ve successfully logged out.');
    res.redirect('/login');
});

module.exports = router;