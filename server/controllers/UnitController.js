const Unit = require('../models/unitModel')

const createUnit = async (req, res) => {
    try {
        const { unitNo } = req.body;
        const userId = req.user._id;

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
    try {
        const userId = req.user._id;
        const unitsById = await Unit.find({ owner: userId });
        return res.status(200).json(unitsById);

    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {
    createUnit,
    getUnits,
}