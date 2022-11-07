const jwt = require('jsonwebtoken');

function sign(data) {
    return jwt.sign(data, process.env.SECRET_KEY)
}

function verify(data) {
    return jwt.verify(data, process.env.SECRET_KEY);
}
module.exports = { sign, verify}
