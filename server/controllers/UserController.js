const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../cfg');
const User = require('../models/userModel');

const register = async (req, res) => {
    const { fname, lname, patronimic, address, phoneNo, email, password, role } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.json({ message: "Користувач уже існує, введіть інші дані" });
        }
        await User.create({
            fname,
            lname,
            patronimic,
            address,
            phoneNo,
            email,
            password: encryptedPassword,
            role,
        });
        return res.json({ message: "Створено" })
    } catch (error) {
        res.json({ message: error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    try {


        if (!user) {
            return res.json({ message: "Користувача не знайдено, Введіть іншу почту" });
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ usid: user._id, email: user.email, role: user.role }, config.jwt.TOKEN, {
                expiresIn: config.jwt.EXPIRESIN,
            })

            if (res.status(201)) {
                return res.json({
                    status: "ок",
                    user: user,
                    token: token
                });
            } else {
                return res.json({ message: "Щось пішло не так" });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Користувача не знайдено"
        });
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
        return res.status(200).json({
            message: "Користувача знайдено",
            user: user
        })
    } catch (error) {

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