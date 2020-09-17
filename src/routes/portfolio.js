// import { Router } from 'express';
const { Router } = require('express');

 
const router = Router();
//  return all portfolios saved in the database
router.get('/', async (req, res) => {
  const portfolios = await req.context.models.Portfolio.find();
  return res.send(portfolios);
});
//  return a portfolio by id
router.get('/:portfolioId', async (req, res) => {
  const portfolio = await req.context.models.Portfolio.findById(
    req.params.portfolioId,
  );
  return res.send(portfolio);
});

// return a portfolio history over the last x days
router.get('/history/:portfolioId', async (req, res) => {
    let interval = req.query.days;
    let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
    interval = Math.min(portfolio.history.length, req.query.days)
    rv = portfolio.history.slice(0).slice(-interval)
  return res.send(rv)
})

//  create a new portfolio
router.post('/', async (req, res) => {
  // needs to be updated
  // const portfolio = await req.context.models.Portfolio.create({
  //   name: req.body.name,
  //   user: req.context.currentUser.id,
  //   funds: 0,
  //   percent_allocated: 0,
  //   active: false,
  //   asset_num: 0,
  //   last_rebalance: new Date(),
  // });
 
  return res.send(message);
});
// update portfolio based on form
router.put('/update/:portfolioId', async (req, res) => {
    const portfolio = await req.context.models.Portfolio.save({
      name: req.body.name,
      user: req.context.currentUser.id,
      funds: req.body.funds,
      percent_allocated: req.body.percent_allocated,
      active: req.body.active,
      asset_num: req.body.asset_num,
    // can not be handled by user
    //   last_rebalance: new Date(), 
    });

    return res.jsonp(portfolio);
});

// do a fetch and use the method from API. have express.json
router.delete('/delete/:portfolioId', async (req, res) => {
  const portfolio = await req.context.models.Portfolio.findById(
    req.params.portfolioId,
  );
 
  if (portfolio) {
    await portfolio.remove();
  }
 
  return res.send(portfolio);
});
 
// export default router;
module.exports = router;

// name: req.body.name
// active: req.body.active
// usableFunds: req.body.usableFunds
// startingValue: { // What

// },
// currentValue: { // changes of all of the stocks accounted for. Sum of all tickerCurrValues
//   type: Number,
//   required: true
// },
// // Array of all the tickers: [{symbol : 'TSLA', allocation: 21, currValue: 20}, {symbol : 'AMZN', allocation: 79, currValue: 80}]
// tickers: [{
//   symbol: String,
//   allocation: Number,
//   desiredAllocation: Number,
//   currValue: Number,
//   units: Number,
// }],
// followers: { 
//   type: Array,
//   required: true,
// },
// history: [{
//   date: Date,
//   value: Number
// }],
// user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},