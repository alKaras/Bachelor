const mongoose = require('mongoose');
const { dateFormat } = require("../utils");
const unitModelSchema = new mongoose.Schema(
    {
        unitNo: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        owner: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "UserInfo",
        },

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