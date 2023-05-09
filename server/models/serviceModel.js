const mongoose = require('mongoose');

const serviceModelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    }
})

mongoose.model("ServiceInfo", serviceModelSchema);