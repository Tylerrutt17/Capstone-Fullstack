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
    docs.forEach( async (portfolio)=> {
        await updateSpecificPortfolio(portfolio, prices)
    })
}
const updateSpecificPortfolio = async (p, prices) => {
// for each ticker in the portfolio:
    let allTickers = p.tickers
    p.tickers.forEach(async (ticker)=> {
        let newPrice = prices.find(t=>t.symbol==ticker.symbol) //find the price in prices array
        // let units = p.tickers.find(t=>t.symbol==ticker.symbol).units // find units in portfolio model
        let units = ticker.units
        let newCurrValue = newPrice*units // calculates new current value
        let newAllocation = p.currentValue / newCurrValue // calculates new allocation
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...allTickers.filter(t=>t.symbol!=symbol),{symbol : symbol, allocation: newAllocation, currValue: newCurrValue, units: units}]}
            )
    })
    // Recalculate each portfolios current value and save previous to history array
    let oldHistory = p.history
    let newValue = sum(p.tickers.map(t=>t.currValue)+p.usableFunds)
    await models.Portfolio.updateOne({ _id: p._id },
        { history: [...oldHistory, {date: new Date(), value: newValue}]})
    await models.Portfolio.updateOne({ _id: p._id },
        { currentValue: newValue})
}

module.exports = updateAllPortfolios