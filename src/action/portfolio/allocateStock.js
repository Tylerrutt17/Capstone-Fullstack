const {models} = require('../../models')
const fetchPrice = require('../stock/returnPrice').fetchPrice
const initializePrice = require('../prices/seedPrices').initializePrice

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
// await allocate(p._id, ticker.desiredAllocation, ticker.symbol)
const allocate = async (portfolioId, allocation, symbol) => {
    console.log("allocating stock")
    console.log(portfolioId, allocation, symbol)
    // determine if stock price is seeded, if not seeded
    const prices = await models.Prices.find()
    let p = await models.Portfolio.findById(portfolioId);
    if (!prices.find(price => price.ticker === symbol)) {
        await initializePrice(symbol)
    }
    let price = prices.find(price => price.ticker === symbol).currPrice // current price of the ticker
    let newCurrValue = allocation*.01*p.currentValue
    let newUnits = newCurrValue / price //fine with splitting units
    let currentPortfolioAllocation = sum(p.tickers.map(t=>t.allocation)) // another way of writing this is (p.currentValue - p.usableFunds) / p.currentValue
    // if stock is in portfolio
    console.log(p.tickers.filter(t => t.symbol === symbol).length, "line 64")
    if (p.tickers.filter(t => t.symbol === symbol).length) {
        let ticker = p.tickers.find(t=>t.symbol==symbol)
        let allocationDiff = (allocation - ticker.allocation)*.01
        let fundResult = p.usableFunds - (allocationDiff * p.currentValue)
        if (fundResult < 0) {console.log("not possible")}
        
        console.log("line 76", symbol, allocation, newCurrValue, newUnits)
    //     // reallocate
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...p.tickers.filter(t=>t.symbol!=symbol),
                {symbol : symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
            // update usableFunds
        await models.Portfolio.updateOne({ _id: portfolioId },
            { usableFunds: fundResult})
            console.log("stock allocated")
    }  
    else { // else add it to portfolio
        // check if value of the allocation is less than total usable funds
        let fundResult = p.usableFunds - allocation*.01*p.currentValue
        if (fundResult < 0) {console.log("not possible")}
        console.log("line 87")
        await models.Portfolio.updateOne({ _id: portfolioId },
            { tickers: [...p.tickers, 
                {symbol: symbol, allocation: allocation, desiredAllocation: allocation, currValue: newCurrValue, units: newUnits}]})
        console.log(p.tickers)
            // update usableFunds
        console.log("line 93", fundResult)
        await models.Portfolio.updateOne({ _id: portfolioId },
            { usableFunds: fundResult})
            console.log("stock allocated")
        }
}
    


module.exports = {buyStock, allocate}