// const returnSymbols = require('../stock/returnSymbols')
const { models}  = require('../../models');
const fetchPrice = require('../stock/returnPrice').fetchPrice


bigStocks = ["AMZN", "AAPL", "TSLA", "MSFT", "GOOG", "FB", "V", "JNJ", "WMT", "PG", "MA", "JPM", "NVDA", "HD", "UNH", "VZ", "DIS", "ADBE", "CRM", "BAC", "KO", "PYPL", "MRK", "NFLX"]

// goal - seed biggest 50 stocks by mcap into prices table. If user wants to add non seeded stock, check if supported and add to table
const seedPrices = async () => {
    await Promise.all([models.Prices.deleteMany({})])
    bigStocks.forEach(async stock => {
        await fetchPrice(stock, async (response) => {
            await addStock(stock, response.o)
        })
    })
}
const addStock = async (stock, price) => {
    const p = await new models.Prices({
        ticker: stock,
        prevPrice: price,
        currPrice: price,
        lastUpdate: new Date(),
        })
    await p.save()
  };
  
const initializePrice = async (stock) => {
    await fetchPrice(stock, async (response) => {
        await addStock(stock, response.o)
    })
};

module.exports = {seedPrices, addStock, initializePrice}