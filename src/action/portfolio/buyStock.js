// pseudo code
const {models} = require('../../models')

const buyStock = async (portfolioId, symbol, units) => {
// buy a stock
    // determine if stock price is seeded, if not seeded
    var price;
    await models.Prices.findOne({ticker:{$e:symbol}}, (err, docs) =>  {
        if (err) {
            // determine if stock is supported 
            console.log("stock not added yet")
            // if supported: 
                //     await new models.Prices({
                    // ticker: stock,
                    // prevPrice: price,
                    // currPrice: price,
                    // lastUpdate: new Date(),
                    // }).save 
        }
    price = docs.currPrice
    })
    // determine funds available in current portfolio
    let portfolio = await models.Portfolio.findById(portfolioId);
    let usableFunds = (100 - portfolio.allocation) * portfolio.funds;
    // determine max volume of stock possible to purchase
    let maxVol = usableFunds / price; // integer division to be precise
    // grab user input from front end
    // calculate portfolio allocation of purchase
    let newAllocation = portfolio.funds / units*price;
    await models.Stock.findOne({ticker:{$e:symbol}, portfolioId:{$e:portfolioId}}, (err, docs) =>  {
    // if stock not in portfolio
    if (err) {

        // insert stock into stock table
        let stock = await models.Stock.create({
            stock: symbol,
            avg_price: price, 
            volume: units,
            current_value: price, // deprecated field. never used
            allocation: newAllocation, 
            user: portfolio.user,
            portfolio: portfolio, // needs to handled by a function i.e. active
        });
        stock.save()
    }
    else {
        // update stock
        let stockId = docs._id
        let newAvgPrice = (docs.avg_price*docs.volume + docs.price*units)/docs.volume+units
        let newVolume = docs.volume+units
        await models.Prices.updateOne({ _id: docs._id }, { avg_price:newAvgPrice, volume: newVolume, allocation: newAllocation })
    }})
    // update portfolio table
    // allocation percentage, asset num
    await models.Portfolio.updateOne({ _id: portfolioId },
        { percent_allocated:portfolio.percent_allocated+newAllocation, asset_num: portfolio.asset_num+1 })
    // re-render front end to showcase purchase
    return "relevant stuff here"
}

module.exports = buyStock;