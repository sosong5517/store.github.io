const jwt = require('jsonwebtoken');
const AuthService = require('../services/auth.service');
const authServive = new AuthService()

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {

        if (authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length);
            console.log('token', token)
            if (!token) {
                res.status(403).json({ message: "Invalid token!" });
            }
            //..................
            let decodedToken;
            try {
                decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    res.status(403).json({ message: "jwt expired" });
                }
            }
            //.................

            //  const data = await jwt.verify(token, process.env.SECRET_KEY);
            if (decodedToken) {

                const valid = await authServive.validationSession(decodedToken.sessionId);
                console.log('valid', valid)
                if (valid) {
                    next();
                } else {
                    res.status(403).json({ message: "Access not permitted" });
                }
            }


        }
    } else {
        res.sendStatus(401);
    }

};

module.exports = tokenValidation;