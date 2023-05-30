const Service = require('../models/userServiceModel');

const createService = async (req, res) => {
    try {
        const uid = req.user._id;
        const uemail = req.user.email;
        const { type } = req.body;
        const newService = await Service.create({
            type,
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
    return res.status(200).json({ servs: services });
}

const updateStatusServ = async (req, res) => {
    try {
        const servID = req.params.servid.toString();
        const updatedService = await Service.findByIdAndUpdate(servID, { status: true });
        return res.status(200).json({ updated: updatedService });
    } catch (error) {
        return res.status(500).json({ message: "Не вдалось виконати редагування" })
    }
}

const deleteService = async (req, res) => {
    try {
        const servID = req.params.servid.toString();
        const deletedService = await Service.findByIdAndDelete(servID);
        return res.status(200).json({ deleted: deletedService });
    } catch (error) {
        return res.status(500).json({ message: "Не вдалось виконати операцію" })
    }
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
    updateStatusServ,
    deleteService,
}