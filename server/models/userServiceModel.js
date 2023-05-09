const mongoose = require('mongoose');

const userServiceSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            default: "Замовлено",
        },
        servtitle: {
            type: String,
            ref: "ServiceInfo",
            required: true,
        },
        userid: {
            type: mongoose.Types.ObjectId,
            ref: "UserInfo",
        },
        sendDate: {
            type: Date,
            default: Date.now(),
        },
    }
);

mongoose.model("userService", userServiceSchema);