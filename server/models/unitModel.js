const mongoose = require('mongoose');
const unitModelSchema = new mongoose.Schema(
    {
        unitNo: {
            type: Number,
            require: true,
        },
        date: {
            type: Date,
            require: true,
            default: Date.now(),
        },
        owner: {
            type: mongoose.Types.ObjectId,
            require: true,
            ref: "UserInfo",
        },
        ownerAddress: {
            type: String,
            require: true,
            ref: "UserInfo",
        }

    },
    {
        collection: "UnitInfo",

    }
)

const Unit = mongoose.model("UnitInfo", unitModelSchema);
module.exports = Unit;