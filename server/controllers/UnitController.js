const mongoose = require('mongoose');
require("../models/unitModel");
const Unit = mongoose.model("UnitInfo");

const createUnit = async (req, res) => {
    const { unitNo } = req.body;
    const userId = req.user._id;

    try {
        const unit = await Unit.create({
            unitNo,
            owner: userId,
        })

        if (res.status(200)) {
            return res.json({ unit });
        }
    } catch (error) {
        return res.send({ status: "error" });
    }
}

const getUnits = async (req, res) => {
    const userId = req.user._id;

    const units = await Unit.findById({ userId });

    return res.status(200).json(units);
}

module.exports = {
    createUnit,
    getUnits,
}