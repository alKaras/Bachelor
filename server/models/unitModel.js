const mongoose = require('mongoose');
const { dateFormat } = require("../utils");
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

unitModelSchema.virtual('formattedDate').get(() => {
    return dateFormat(this.date);
})

unitModelSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret.date
        delete ret.id
    }
})

const Unit = mongoose.model("UnitInfo", unitModelSchema);
module.exports = Unit;