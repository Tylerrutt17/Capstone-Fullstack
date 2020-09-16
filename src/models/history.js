const mongoose = require('mongoose')

let historySchema = new mongoose.Schema({
    totalFunds: {
        Number,
    },
    date: {
        type: Date,
        required: true
    },
    portfolio: {type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio'},
    }, { timestamps: true }
    )
    const History = mongoose.model("History", historySchema);
    

exports.History = History;