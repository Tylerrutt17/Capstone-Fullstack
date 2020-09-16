const { models } = require('../../models');


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
    p.tickers.forEach(async (ticker)=> {
        let allTickers = p.tickers
        let newPrice = prices.find(t=>t.symbol==ticker.symbol) //find the price in prices array
        let units = p.tickers.find(t=>t.symbol==ticker.symbol).units // find units in portfolio model
        let newCurrValue = newPrice*units // calculates new current value
        let newAllocation = p.currentValue / newValue // calculates new allocation
        await models.Portfolio.updateOne({ _id: p._id },
            { tickers: [...allTickers.filter(t=>t.symbol!=symbol),{symbol : symbol, allocation: newAllocation, currValue: newCurrValue, units: units}]}
            )
    })
}

module.exports = updateAllPortfolios