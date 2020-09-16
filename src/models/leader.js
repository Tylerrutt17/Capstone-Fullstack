const mongoose = require('mongoose')

let leaderSchema = new mongoose.Schema({
    tickers: {
        type: Array,
        required: true,
    },
    target_allocations: {
        type: Array,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    previous_price: {
        type: Number,
        required: true,
    },
    current_value: {
        type: Number,
        required: true,
    },
    allocation: {
        type: Number,
        required: true,
    }
})
const Stock = mongoose.model("Stock", stockSchema)

exports.Stock = Stock