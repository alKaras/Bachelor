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
        type: {
            type: String,
            enum: ["Встановлення сонячних панелей", "Відключення електроенергії", "Підключення електроенергії"],
            require: true,
        },
        useremail: {
            type: String,
            ref: "UserInfo",
        },
        status: {
            type: Boolean,
            default: false,
        },
        sendDate: {
            type: Date,
            default: Date.now(),
        },
    }
);

const UserService = mongoose.model("userService", userServiceSchema);
module.exports = UserService;