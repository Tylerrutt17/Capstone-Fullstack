const { models } = require('../../models');


const sum = (array) => {
    let sum = array.reduce((a, b) => {
        return a + b;
    }, 0);
    return sum
}

const updateAllPortfolios = async () => {
    // Observe Each Portfolio Object
    const docs = await models.Portfolio.find()
    const prices = await models.Prices.find()
    // docs.forEach( async (portfolio)=> {
    //     await updateSpecificPortfolio(portfolio, prices)
    // })
    for (let i = 0; i < docs.length; i++) {
        let portfolio = docs[i]
        await updateSpecificPortfolio(portfolio, prices)
    }
}
const updateSpecificPortfolio = async (p, prices) => {
// for each ticker in the portfolio:
    // p.tickers.forEach(async (ticker)=> {
    console.log(p.tickers)
    let newTickers = p.tickers.map((ticker) => {
        let newPrice = prices.find(t=>t.ticker==ticker.symbol).currPrice //find the price in prices array
        console.log(newPrice)
        let newCurrValue = newPrice*ticker.units // calculates new current value
        return {symbol : ticker.symbol, allocation: ticker.allocation, desiredAllocation: ticker.desiredAllocation, currValue: newCurrValue, units: ticker.units}
    })
    console.log(newTickers)
    let result = await models.Portfolio.updateOne({ _id: p._id }, 
        { tickers: newTickers})
    // Recalculate each portfolios current value and save previous to history array
    let oldHistory = p.history
    let newPortfolioValue = sum(newTickers.map(t=>t.currValue))+p.usableFunds
    console.log(newPortfolioValue)
    await models.Portfolio.updateOne({ _id: p._id },
        { history: [...oldHistory, {date: new Date(), value: newPortfolioValue}]})
    await models.Portfolio.updateOne({ _id: p._id },
        { currentValue: newPortfolioValue})
    // calculate allocations based on updated portfolio price
    let newerTickers = newTickers.map((ticker)=> {
        // must calculate allocations after summing up all newValues
        let newAllocation = (ticker.currValue / newPortfolioValue)*100 // calculates new allocation
        return {symbol : ticker.symbol, allocation: newAllocation, desiredAllocation: ticker.desiredAllocation, currValue: ticker.currValue, units: ticker.units}
    })
    let res = await models.Portfolio.updateOne({ _id: p._id },
        { tickers: newerTickers })
}


const test = async () => {
    const prices = await models.Prices.find()
    const p = await models.Portfolio.findById('5f6266816fa288d9ffc36411')
    p.tickers.forEach(async (ticker)=> {
        console.log(ticker.symbol)
        let newPrice = prices.find(t=>t.ticker===ticker.symbol).currPrice
        console.log(newPrice)
    })
}
module.exports = updateAllPortfolios