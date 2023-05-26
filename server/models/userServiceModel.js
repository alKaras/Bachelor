const mongoose = require('mongoose');

const userServiceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        cost: {
            type: Number,
            require: true,
        },
        userid: {
            type: mongoose.Types.ObjectId,
            ref: "UserInfo",
        },
        useremail: {
            type: String,
            ref: "UserInfo",
        },
        status: {
            type: String,
            default: "Замовлено",
        },
        sendDate: {
            type: Date,
            default: Date.now(),
        },
    }
);

const UserService = mongoose.model("userService", userServiceSchema);
module.exports = UserService;