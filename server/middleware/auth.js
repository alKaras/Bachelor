const jwt = require('jsonwebtoken');
const config = require('../cfg');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({ error: "Please auth using a valid token" });
        }
        const decodedToken = jwt.verify(token, config.jwt.TOKEN);
        const user = await User.findById(decodedToken.usid);

        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Authentication failed" });
    }
}

