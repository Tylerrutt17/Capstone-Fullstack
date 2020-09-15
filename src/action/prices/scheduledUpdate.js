// Finhub connection info
const finnhub = require('finnhub');
const finnKey = require('../../../config/keys').finnKey
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnKey
const finnhubClient = new finnhub.DefaultApi()
const schedule = require('node-schedule'); // scheduling at times
const fetchPrice = require('../stock/returnPrice').fetchPrice
const { models } = require('../../models');


const scheduledUpdate = () => {
    var rule1 = new schedule.RecurrenceRule();
    rule1.dayOfWeek = [1, new schedule.Range(0, 6)];
    rule1.second = 30; // runs each minute when second value is at 30
    var j = schedule.scheduleJob(rule1, function(){
        console.log('Reached 30 Seconds of the Current Minute');
    });
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1, 5)]; // Set to run ONCE each day monday through friday.
    rule.hour = 9;
    rule.minute = 30;
  //var j = schedule.scheduleJob(rule, updateStockPrices)
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
  // updateStockPrices()
  // var j = schedule.scheduleJob(rule, function(){
  //   console.log('Today is recognized by Rebecca Black!');
  // });
  // export default router;
  // exports.router = router.router;
//  models.Portfolio.find().then(data=>console.log(data));
//   createUsersWithPortfolio()

// const stock = await req.context.models.Portfolio.findById(
//     req.params.stockId,
//   );
}
module.exports = scheduledUpdate