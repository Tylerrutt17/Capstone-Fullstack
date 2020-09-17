const mongoose = require('mongoose')

let pricesSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
        unique: true
    },
    prevPrice: {
        type: Number,
    },
    currPrice: {
        type: Number,
    },
})
const Prices = mongoose.model("Prices", pricesSchema);
    

exports.Prices = Prices;