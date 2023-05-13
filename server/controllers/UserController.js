const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../cfg');
const User = require('../models/userModel');

const register = async (req, res) => {
    const { fname, lname, patronimic, address, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.json({ message: "Користувач уже існує, введіть інші дані" });
        }
        const newUser = await User.create({
            fname,
            lname,
            patronimic,
            address,
            email,
            password: encryptedPassword
        });
        const user = await newUser.save();

        return res.json({
            user: user,
            message: "Створено"
        })
    } catch (error) {
        res.json({ message: "Не вдалось створити акаунт" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (!user) {
        return res.json({ message: "Користувача не знайдено, Введіть іншу почту" });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ usid: user._id, email: user.email, role: user.role }, config.jwt.TOKEN, {
            expiresIn: config.jwt.EXPIRESIN,
        })

        if (res.status(200)) {
            return res.json({
                user: user,
                userRole: user.role,
                token: `Bearer ${token}`
            });
        } else {
            return res.json({ message: "Щось пішло не так" });
        }
    }

}

const getUsers = async (req, res) => {
    const users = await User.find({});

    return res.status(200).json(users);
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404).json({
                message: "Користувача не знайдено"
            })
        }
        const token = jwt.sign({ usid: user._id, email: user.email, role: user.role }, config.jwt.TOKEN, {
            expiresIn: config.jwt.EXPIRESIN,
        })
        return res.status(200).json({
            user: user,
            token: `Bearer ${token}`
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findByIdAndDelete({ userId });

        if (!user) {
            return res.status(404).json({ message: `Не знайдено користувача за ID: ${userId} ` });
        }
        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: "Користувача видалено" });
    }
}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
    deleteUser
}