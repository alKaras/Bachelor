const Unit = require('../models/unitModel')

const createUnit = async (req, res) => {
    try {
        const { unitNo } = req.body;
        const userId = req.user._id;
        const userAddress = req.user.address;

        const unit = await Unit.create({
            unitNo,
            owner: userId,
            ownerAddress: userAddress,
        })

        if (res.status(200)) {
            return res.json({ unit: unit });
        }
    } catch (error) {
        return res.send({ message: "Не вдалось відправити показники" });
    }
}

const getUnits = async (req, res) => {
    try {
        const userId = req.user._id;
        const unitsById = await Unit.find({ owner: userId });
        return res.status(200).json({ units: unitsById });

    } catch (error) {
        return res.status(500).json({ message: "Щось пішло не так" });
    }
}
const getAllUnits = async (req, res) => {
    const unitsAll = await Unit.find({});
    return res.status(200).json({ units: unitsAll });
}

module.exports = {
    createUnit,
    getUnits,
    getAllUnits,
}