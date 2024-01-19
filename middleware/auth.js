const jwt = require('jsonwebtoken');
const config = require('config');

// authenticate the user's token whenever a route is called
// because this is middleware, this happens before any logic executes in the route
const auth = (req, res, next) => {
    // get the authentication token
    const token = req.header('x-auth-token');
    // if no token, send access denied error
    if (!token) return res.status(401).send('access denied. no token provided');

    try {
        // verify token is valid by decoding it
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        // put decoded token inside the user property in the request
        // can access the user's _id through the payload created in user.js line 30
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send('invalid token');
    }
};

module.exports = auth;