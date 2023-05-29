const mongoose = require('mongoose');

const userServiceSchema = new mongoose.Schema(
    {
        userid: {
            type: mongoose.Types.ObjectId,
            ref: "UserInfo",
        },
        type: {
            type: String,
            enum: ["sunpanels", "powercut", "powerconnect"],
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