const returnSymbols = require('../stock/returnSymbols')
const { models}  = require('../../models');
const fetchPrice = require('../stock/returnPrice').fetchPrice


bigStocks = ["AAPL", "TSLA", "MSFT", "GOOG", "FB", "V", "JNJ", "WMT", "TSLA", "PG", "MA", "JPM", "NVDA", "HD", "UNH", "VZ", "DIS", "ADBE", "CRM", "BAC", "KO", "PYPL", "MRK", "NFLX"]

// goal - seed biggest 50 stocks by mcap into prices table. If user wants to add non seeded stock, check if supported and add to table
const seedPrices = async () => {
    bigStocks.forEach(stock => {
        fetchPrice(stock, (response) => {
            // console.log(stock, response.o)
            seedOne(stock, response.o)
        })
    })
}
const seedOne = async (stock, price) => {
    await new models.Prices({
        ticker: stock,
        prevPrice: price,
        currPrice: price,
        lastUpdate: new Date(),
        }).save
  };
seedPrices()

module.exports = seedPrices