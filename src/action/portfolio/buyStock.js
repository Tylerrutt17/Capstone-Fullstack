// pseudo code
const {models} = require('../../models')
const fetchPrice = require('../stock/returnPrice').fetchPrice
const addStock = require('../prices/seedPrices').addStock


const seedTicker = async (symbol) => {
    fetchPrice(symbol, (response) => {
        addStock(symbol, response.o)
    })
}

const buyStock = async (portfolioId, symbol, units) => {
// buy a stock
    // determine if stock price is seeded, if not seeded
    var price;
    await models.Prices.findOne({ticker:{$e:symbol}}, (err, docs) =>  {
        if (err) {
            // assume support for now
            seedTicker(symbol)
            await models.Prices.findOne({ticker:{$e:symbol}}, (err, docs) =>  {var price = docs.currPrice})
        }
        else {price = docs.currPrice}
    })
    // determine funds available in current portfolio
    let portfolio = await models.Portfolio.findById(portfolioId);
    // determine max volume of stock possible to purchase
    let maxVol = portfolio.usableFunds / price; // integer division to be precise
    // grab user input from front end
    // calculate stock allocation after purchase
    let addedAllocation = portfolio.currentValue / units*price;
    // update portfolio table
    // allocation percentage, asset num
    // if they have stock but want to add
    let p = await models.Portfolio.findById(portfolio._id);

    // if stock is in portfolio
    if (p.tickers.find( ({symbol}) => symbol === symbol )) {
        //  determine new values and add to db
        let currentTickers = p.tickers
        let ticker = p.tickers.filter(t=>t.symbol==symbol)
        let newAllocation = ticker.allocation + addedAllocation
        let newcurrValue = ticker.currentValue + units*price
        let newUnits = ticker.units + units
        await models.Portfolio.updateOne({ _id: portfolio._id },
            { tickers: [...currentTickers.filter(t=>t.symbol!=symbol),{symbol : symbol, allocation: newAllocation, currValue: newcurrValue, units: newUnits}]})
        }
    // else add it
    else {
        await models.Portfolio.updateOne({ _id: portfolioId },
            { tickers: [...currentTickers, {symbol: symbol, allocation: addedAllocation, currValue: units*price, units: units}]})
        }
    return `Purchased ${units} of ${symbol} at ${price}`
}

module.exports = buyStock;