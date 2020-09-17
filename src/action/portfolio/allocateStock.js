const {models} = require('../../models')
const fetchPrice = require('../stock/returnPrice').fetchPrice
const initializePrice = require('../prices/seedPrices').initializePrice

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
// needs work
const allocateStock = async (portfolioId, allocation, symbol) => {
    // determine if stock price is seeded, if not seeded
    const prices = await models.Prices.find()
    if (!prices.find(price => price.ticker === 'symbol')) {
        await initializePrice(symbol)
    }
    let price = prices.find(price => price.ticker === symbol).currPrice // reseed and change back to current price
    let p = await models.Portfolio.findById(portfolioId);
    let currentPortfolioAllocation = sum(p.tickers.map(t=>t.allocation))
    if (allocation + currentPortfolioAllocation > 100 || allocation + currentPortfolioAllocation <0 ) { return "not possible"}
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
            { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),
                {symbol : symbol, allocation: newAllocation, currValue: newCurrValue, units: newUnits}]})
        }
    // else add it
    else {
        await models.Portfolio.updateOne({ _id: portfolioId },
            { tickers: [...currentTickers, 
                {symbol: symbol, allocation: allocation, desiredAllocation: allocation, currValue: units*price, units: units}]})
        }
    return p
}
const allocate = async (portfolioId, allocation, symbol) => {
    // determine if stock price is seeded, if not seeded
    const prices = await models.Prices.find()
    let p = await models.Portfolio.findById(portfolioId);
    if (!prices.find(price => price.ticker === 'symbol')) {
        await initializePrice(symbol)
    }
    let price = prices.find(price => price.ticker === symbol).currPrice
    let newUnits = allocation*.01*p.currentValue / price; //fine with splitting units
    let newCurrValue = price*units
    let fundResult = p.usableFunds - newCurrValue
    if (fundResult < 0) return "not possible"
    let currentTickers = p.tickers
    // if stock is in portfolio
    if (p.tickers.find( ({symbol}) => symbol === symbol )) {
        let ticker = currentTickers.find(t=>t.symbol==symbol)
        // deallocate
        // update usableFunds
        let fundRestore = ticker.currValue + p.usableFunds
        await models.Portfolio.updateOne({ _id: portfolioId },
            { usableFunds: fundRestore})
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),
                {symbol : symbol, allocation: 0, desiredAllocation: allocation, currValue: 0, units: 0}]})
        // reallocate
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),
                {symbol : symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
    } else {
    // else add it to portfolio
    // chck usable funds - return not possible if over  
    if (p.usableFunds)
    await models.Portfolio.updateOne({ _id: portfolioId },
        { tickers: [...currentTickers, 
            {symbol: symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
    }
    // update usableFunds
    await models.Portfolio.updateOne({ _id: portfolioId },
        { usableFunds: fundResult})
}
    


module.exports = {allocateStock, allocate}