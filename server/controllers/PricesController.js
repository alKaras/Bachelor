const PriceList = require('../models/pricesModel');

const createPriceList = async (req, res) => {
    try {
        const { suncost, powerconcost, powercutcost } = req.body;
        const priceList = await PriceList.create({
            suncost: suncost,
            powerconcost: powerconcost,
            powercutcost: powercutcost,
        });

        return res.status(200).json({ prices: priceList });
    } catch (error) {
        return res.status(500).json({ message: "Не вдалось створити цінники" });
    }
}

const getPriceList = async (req, res) => {
    const prices = await PriceList.find({});
    return res.status(200).json({ dataprices: prices });
}

module.exports = {
    createPriceList,
    getPriceList,
}