const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const motelSchema = new Schema({
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true }
}, {
    versionKey: false
}, { collection: "motels" });

module.exports = mongoose.model("Motel", motelSchema);