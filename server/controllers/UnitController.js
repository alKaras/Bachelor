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
const deleteUnitById = async (req, res) => {
    try {
        const unitID = req.params.unitid.toString();
        const delUnitbyID = await Unit.findByIdAndDelete(unitID);
        return res.status(200).json({ deletedunit: delUnitbyID });
    } catch (error) {
        return res.status(500).json({ message: "Не вдалось видалити запис" });
    }
}

const getSumofUnitsById = async (req, res) => {
    try {
        const userId = req.user._id;
        const sum = await Unit.aggregate([
            {$match: {owner: userId}},
            { $group: { _id: null, total: { $sum: '$unitNo' } } },
        ]);
        res.status(200).json({ sumunits: sum[0].total });
    } catch (error) {
        return res.status(500).json({message: "Не вдалося зробити операцію"})
    }

}
module.exports = {
    createUnit,
    getUnits,
    getAllUnits,
    deleteUnitById,
    getSumofUnitsById,
}