const mongoose = require('mongoose')

let portfolioSchema = new mongoose.Schema({
    name: {
        String
    },
    funds: {
        Number
    },
    percent_allocated: {
        Number
    },
    active: {
        type: Boolean,
        required: true,
    },
    asset_num: {
        type: Number,
        required: true
    },
    lastRebalance: {
        type: Date,
        required: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }, { timestamps: true }
    )
    const Portfolio = mongoose.model("Portfolio", portfolioSchema);
    

exports.Portfolio = Portfolio;