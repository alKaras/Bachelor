const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        patronimic: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserModelSchema);