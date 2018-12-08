const jwt = require('jsonwebtoken');


// Generate JWT with passed in payload
const signToken = (payload, secret, expireIn, done) => {

    jwt.sign({ userId: payload.userId }, secret, { expiresIn: expireIn }, (err, token) => {
        if (err) {
            return done(err.message);
        } else {
            const response = {
                userName: payload.userName,

                referralCode: payload.referralCode,
                contact: payload.contact,
                cart: payload.cart,
                userEmail: payload.userEmail,
                referralCouponCount: payload.referralCouponCount,
                token: token
            }
            return done(null, response);
        }
    });
};

// Validate the token passed
const verifyToken = (token, secret, done) => {

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return done(err.message);
        } else {
            return done(null, decoded);
        }
    });
};


module.exports = {
    signToken: signToken,
    verifyToken: verifyToken
}