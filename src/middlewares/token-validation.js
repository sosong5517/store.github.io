const jwt = require('jsonwebtoken');
const AuthService = require('../services/auth.service');
const authServive = new AuthService()

const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        
        if (authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length);
            console.log('token',token)

            const data = jwt.verify(token, process.env.SECRET_KEY);
            console.log('data jwt', data)
            const valid = await authServive.validationSession(data.sessionId);
            console.log('valid',valid)
            if (valid) {
                next();
            } else {
                res.status(403).json({message: "Access not permitted"});
            }

        }
    } else {
        res.sendStatus(401);
    }

};

module.exports = tokenValidation;