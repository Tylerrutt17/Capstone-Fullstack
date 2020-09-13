const mongoose = require('mongoose')

let stockSchema = new mongoose.Schema({
    stock: {
        type: String,
        required: true,
    },
    avg_price: {
        type: Number,
        required: true,
    },
    volume: {
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
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    portfolio:  {type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio'},
    }, { timestamps: true })
const Stock = mongoose.model("Stock", stockSchema)

exports.Stock = Stock

