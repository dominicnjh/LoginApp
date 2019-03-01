const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb+srv://dominicnjh:192gjc4w!@personaldb-jytrz.mongodb.net/loginAppDB', { useNewUrlParser: true })
        .then(() => console.log('Connected to loginAppDB'))
        .catch((err) => console.error('Could not connect to loginAppDB'));
}