const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mtID: { type: Schema.Types.ObjectId, required: true, ref: 'motels' },
    isDeleted: { type: Boolean, required: true, default: false }
}, {
    versionKey: false
}, { collection: "members" });

module.exports = mongoose.model("Member", memberSchema);