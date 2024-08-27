const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    amountRequired: {
        type: Number,
        required: true,
    },
    amountCompleted: {
        type: Number,
        default: 0,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;