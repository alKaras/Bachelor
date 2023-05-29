const jwt = require('jsonwebtoken');
const config = require('../cfg');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Please auth using a valid token" });
        }
        const decodedToken = jwt.verify(token, config.jwt.TOKEN);
        const user = await User.findById(decodedToken.usid);

        req.user = user;
        next();
    } catch (error) {
        res.json({ message: "Автентифікація не пройдена. Немає доступу" });
    }
}

