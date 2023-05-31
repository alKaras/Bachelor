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
            return res.status(401).json({ message: "Користувач уже існує, введіть інші дані" });
        } else {
            const newUser = await User.create({
                fname,
                lname,
                patronimic,
                address,
                email,
                password: encryptedPassword
            });
            const user = await newUser.save();

            return res.status(200).json({
                user: user,
            })
        }
    } catch (error) {
        return res.status(401).json({ message: "Не вдалось створити акаунт" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (!user) {
        return res.status(401).json({ message: "Користувача не знайдено, Введіть іншу почту" });
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
        }
    } else {
        return res.status(401).json({ message: "Пароль не вірний" })
    }

}

const getUsers = async (req, res) => {
    const users = await User.find({});

    return res.status(200).json({ users: users });
}

const getAmountUsers = async (req, res) => {
    const amountUsers = await User.countDocuments({});
    return res.status(200).json({ amount: amountUsers })
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
        res.status(404).json({ message: "Не вдалось знайти користувача" })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id.toString();
        console.log(userId);
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: `Не знайдено користувача за ID: ${userId} ` });
        }
        return res.status(200).json({ deleteduser: user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Користувача не видалено" });

    }
}

module.exports = {
    register,
    login,
    getUsers,
    getUser,
    deleteUser,
    getAmountUsers,
}