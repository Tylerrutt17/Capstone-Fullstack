const schedule = require('node-schedule'); // scheduling at times
const updateStockPrices = require('./prices/updatePrices')
const updatePortfolioStocks = require('./portfolio/updatePortfolioStocks')
const updateUserTotalFunds = require('./user/updateUserTotalFunds')
const rebalanceAllPortfolios = require('./portfolio/rebalanceAllPortfolios')
const updateFollowerPortfolios = require('./user/updateFollowerPortfolios')


const scheduledUpdate = async () => {
    var rule1 = new schedule.RecurrenceRule();
    rule1.dayOfWeek = [1, new schedule.Range(0, 6)];
    rule1.second = 30; // runs each minute when second value is at 30
    var j = schedule.scheduleJob(rule1, async () => {
        console.log('Reached 10 Seconds of the Current Minute');
        // await updateStockPrices() // Pull down latest prices and update prices table
        await updatePortfolioStocks() // Update all stock prices/values/allocations and history/currentValue in every portfolio
        await updateUserTotalFunds() // Recalculate each users total funds
        // await rebalanceAllPortfolios()
        await updateFollowerPortfolios() // automate allocation of follower portfolios
        console.log("Completed portfolio rebalance")
    });
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [new schedule.Range(1, 5)]; // Set to run ONCE each day monday through friday.
    rule.hour = 9;
    rule.minute = 30;
    var k = schedule.scheduleJob(rule, async () => {
      await updateStockPrices() // Pull down latest prices and update prices table
      await updatePortfolioStocks() // Update all stock prices/values/allocations and history/currentValue in every portfolio
      await updateUserTotalFunds() // Recalculate each users total funds
      await updateFollowerPortfolios() // automate allocation of follower portfolios
  });
  var rule2 = new schedule.RecurrenceRule();
    rule2.dayOfWeek = 0; // Set to run ONCE each day monday through friday.
    rule2.hour = 9;
    rule2.minute = 0;
    var k = schedule.scheduleJob(rule2, async () => {
      await rebalanceAllPortfolios() // rebalance all portfolio allocations each Sunday
    })
}
module.exports = scheduledUpdate

