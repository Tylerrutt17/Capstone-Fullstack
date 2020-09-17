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
// needs work - want this to be an internal function only. should do something different that "allocate"
const buyStock = async (portfolioId, allocation, symbol) => {
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
    console.log("allocating stock")
    // determine if stock price is seeded, if not seeded
    const prices = await models.Prices.find()
    let p = await models.Portfolio.findById(portfolioId);
    if (!prices.find(price => price.ticker === 'symbol')) {
        await initializePrice(symbol)
    }
    let price = prices.find(price => price.ticker === symbol).currPrice
    let newUnits = allocation*.01*p.currentValue / price; //fine with splitting units
    let newCurrValue = price*newUnits
    let fundResult = p.usableFunds - newCurrValue
    if (fundResult < 0) return "not possible: not enough funds"
    let currentPortfolioAllocation = sum(p.tickers.map(t=>t.allocation))
    if (allocation + currentPortfolioAllocation > 100) return "not possible: portfolio is overextended"
    let currentTickers = p.tickers
    console.log(currentTickers)
    // if stock is in portfolio
    if (p.tickers.find( ({symbol}) => symbol === symbol )) {
        let ticker = currentTickers.find(t=>t.symbol==symbol)
        console.log(ticker)
        // deallocate
        // update usableFunds
        let fundRestore = ticker.currValue + p.usableFunds
        console.log(fundRestore)
        await models.Portfolio.updateOne({ _id: portfolioId },
            { usableFunds: fundRestore})
        console.log("line 76")
        // await models.Portfolio.updateOne({ _id: p._id },
        //     { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),
        //         {symbol : symbol, allocation: 0, desiredAllocation: allocation, currValue: 0, units: 0}]})
        // console.log("line 80")
        // reallocate
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),
                {symbol : symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
    } else {
    // else add it to portfolio
    console.log("line 87")
    await models.Portfolio.updateOne({ _id: portfolioId },
        { tickers: [...currentTickers, 
            {symbol: symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
    }
    // update usableFunds
    console.log("line 93")
    await models.Portfolio.updateOne({ _id: portfolioId },
        { usableFunds: fundResult})
        console.log("stock allocated")
}
    


module.exports = {buyStock, allocate}