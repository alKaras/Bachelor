const jwt = require('jsonwebtoken');
const config = require('../cfg');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        // const token = req.header('auth-token');
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: "Please auth using a valid token" });
        }
        const decodedToken = jwt.verify(token, config.jwt.TOKEN);
        const user = await User.findById(decodedToken.usid);

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Автентифікація не пройдена. Немає доступу" });
    }
}

