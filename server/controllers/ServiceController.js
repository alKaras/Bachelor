const Service = require('../models/userServiceModel');

const createService = async (req, res) => {
    try {
        const uid = req.user._id;
        const uemail = req.user.email;
        const { cost } = req.body;
        const newService = await Service.create({
            cost,
            userid: uid,
            useremail: uemail,
        });

        const service = await newService.save();

        return res.status(200).json({
            service: service,
            message: "Внесено",
        })
    } catch (error) {
        res.status(505).json({ message: "Щось пішло не так" });
    }
}

const getServices = async (req, res) => {
    const services = await Service.find({});
    return res.status(200).json({ services: services });
}

const getServById = async (req, res) => {
    try {
        const uid = req.user._id;
        const servById = await Service.find({ userid: uid });

        return res.status(200).json({ services: servById });
    } catch (error) {
        return res.status(500).json({ message: "Щось пішло не так" });
    }
}


module.exports = {
    createService,
    getServById,
    getServices,
}