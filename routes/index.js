const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, (req, res) => {
    res.render('index');
});

module.exports = router;