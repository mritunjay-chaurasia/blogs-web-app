const { mongoose } = require('mongoose');
const { URL } = require('./config/config')

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection Established!");
    })
    .catch((err) => {
        console.log("No Connection Established!");
    });

module.exports = mongoose