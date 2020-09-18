const fetchPrice = require('../stock/returnPrice').fetchPrice
const { models } = require('../../models');



const updateStockPrices = async () => {
    // Runs once per day at 9:30am on mondays through fridays. Extra feature: Observe for holidays.
    // Observe Each Stock Object
    const docs = await models.Prices.find()
    docs.forEach( async (stock)=> {
        // try catch if api returns nulls, don't update the price
        await fetchPrice(stock.ticker, async (response, err) => {
          await updateSpecificStockPrice(response.c, stock)
        })
    })
}
const updateSpecificStockPrice = async (current, stock) => {
  // set the previous days price to the current price (taken yesterday)
  // then update the current price with
  const result = await models.Prices.updateOne({ _id: stock.id }, { ticker:stock.ticker, prevPrice: stock.currPrice, currPrice: current })
};

module.exports = updateStockPrices