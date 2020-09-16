const fetchPrice = require('../stock/returnPrice').fetchPrice
const { models } = require('../../models');



const updateStockPrices = async () => {
    // Runs once per day at 9:30am on mondays through fridays. Extra feature: Observe for holidays.
    // Observe Each Stock Object
    const docs = await models.Prices.find()
    docs.forEach((stock)=> {
        fetchPrice(stock.ticker, (response) => {
          console.log(stock);
          updateSpecificStockPrice(response.o, stock)
          console.log(stock)
        })
    })
}
const updateSpecificStockPrice = async (open, stock) => {
  // set the previous days price to the current price (taken yesterday)
  // then update the current price with
  const result = await models.Prices.updateOne({ _id: stock.id }, { ticker:stock.ticker, prevPrice: stock.currPrice, currPrice: open })
};

module.exports = updateStockPrices