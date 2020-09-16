const {models} = require('../../models')
const fetchPrice = require('../stock/returnPrice').fetchPrice
const addStock = require('../prices/seedPrices').addStock

const seedTicker = async (symbol) => {
    fetchPrice(symbol, (response) => {
        addStock(symbol, response.o)
    })
}
const sum = (array) => {
    let sum = array.reduce((a, b) => {
        return a + b;
    }, 0);
    return sum
}
console.log(sum([3,5]))
const allocateStock = async (portfolioId, allocation, symbol) => {
    // determine if stock price is seeded, if not seeded
    const prices = await models.Prices.find()
    if (!prices.find(price => price.ticker === 'symbol')) {
        await addStock(symbol)
    }
    let price = prices.find(price => price.ticker === symbol).prevPrice // reseed and change back to current price
    let p = await models.Portfolio.findById(portfolioId);
    let currentAllocation = sum(p.tickers.map(t=>t.allocation))
    if (allocation + currentAllocation > 100 || allocation + currentAllocation <0 ) { return "not possible"}
    let units = allocation*.01*p.currentValue / price; //fine with splitting units
    // if stock in portfolio
    if (p.tickers.find( ({symbol}) => symbol === symbol )) {
        //  determine new values and add to db
        let currentTickers = p.tickers
        let ticker = currentTickers.find(t=>t.symbol==symbol)
        let newAllocation = ticker.allocation + allocation
        if (newAllocation < 0 || newAllocation >100) return "not possible"
        let newCurrValue = ticker.currValue + units*price
        let newUnits = ticker.units + units
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),{symbol : symbol, allocation: newAllocation, currValue: newCurrValue, units: newUnits}]})
        }
    // else add it
    else {
        await models.Portfolio.updateOne({ _id: portfolioId },
            { tickers: [...currentTickers, {symbol: symbol, allocation: addedAllocation, currValue: units*price, units: units}]})
        }
    return p
}

module.exports = allocateStock