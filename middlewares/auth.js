module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You\'re not logged in.');
        return res.redirect('/login');
    }
}