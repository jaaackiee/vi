const mongoose = require("mongoose");

const ticketCountSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ticket count", ticketCountSchema);