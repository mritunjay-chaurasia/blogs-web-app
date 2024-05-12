const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';



// Create JWt
module.exports.createToken = (id, expiry) => {
    // Sign the token with the payload, secret key, and options
    const token = jwt.sign({ id, expiry }, secretKey);
    return token;
}

// Parse JWT
module.exports.parseJWT = token => {
    if (token) {
        return jwt.verify(token, jwtKey, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError')
                    return 'token_expired';
                else
                    return 'parse_error';
            } else
                return decoded;
        });
    } else {
        return 'no token provided';
    }
}