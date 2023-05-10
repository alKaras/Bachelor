const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            require: true,
        },
        lname: {
            type: String,
            require: true,
        },
        patronimic: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        phoneNo: {
            type: String,
            require: true,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            require: true,
            default: "user",
        },
    },
    {
        collection: "UserInfo",
    }
);

const User = mongoose.model("UserInfo", UserModelSchema);
module.exports = User;