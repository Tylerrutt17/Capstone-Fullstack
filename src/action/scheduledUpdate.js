const schedule = require('node-schedule'); // scheduling at times
const updateStockPrices = require('./prices/updatePrices')
const updatePortfolioStocks = require('./portfolio/updatePortfolioStocks')


const scheduledUpdate = async () => {
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
    var k = schedule.scheduleJob(rule, async () => {
      await updateStockPrices() // Pull down latest prices and update prices table
      await updatePortfolioStocks() // Update all stock prices/values/allocations in every portfolio
      await updatePortfolioHistoryAndValue() // Recalculate each portfolios current value and save previous to history array
      await updateUserTotalFunds() // Recalculate each users total funds
  });
  //var j = schedule.scheduleJob(rule, updateStockPrices)
}
module.exports = scheduledUpdate

