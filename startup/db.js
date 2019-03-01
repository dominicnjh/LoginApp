const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/loginAppDB', { useNewUrlParser: true })
        .then(() => console.log('Connected to loginAppDB'))
        .catch((err) => console.error('Could not connect to loginAppDB'));
}