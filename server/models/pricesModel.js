const mongoose = require('mongoose');
const pricesModelSchema = new mongoose.Schema(
    {
        sunpanels: {
            type: String,
            default: "Встановлення сонячних панелей"
        },
        suncost: {
            type: Number,
            require: true,
            default: 2000,
        },
        powerconnect: {
            type: String,
            default: "Підключення та налаштування лічильника",
        },
        powerconcost: {
            type: Number,
            require: true,
            default: 500,
        },
        powercut: {
            type: String,
            default: "Відключення лічнильника",
        },
        powercutcost: {
            type: Number,
            require: true,
            default: 500,
        }

    },
    {
        collection: "PriceList",

    }
)

const PriceList = mongoose.model("PriceList", pricesModelSchema);
module.exports = PriceList;