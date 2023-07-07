const mongoose = require("mongoose");

const redCap = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    redcaptoken: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("redCap", redCap)