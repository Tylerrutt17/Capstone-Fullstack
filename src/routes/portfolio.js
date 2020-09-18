// import { Router } from 'express';
const { Router } = require('express');
const { models } = require('../models/index.js');
 
// Finhub connection info
const finnhub = require('finnhub');
const finnKey = require('../../config/keys.js').finnKey
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnKey
const finnhubClient = new finnhub.DefaultApi()

// fetches current price of the ticker
const fetchPrice = (ticker, callback) => {
  finnhubClient.quote(ticker, (error, data, response) => {
      return callback(data);
  });
}

const router = Router();
//  return all portfolios saved in the database
router.get('/', async (req, res) => {
  const portfolios = await req.context.models.Portfolio.find();
  return res.send(portfolios);
});

router.get('/portfolio-allocations', async (req, res) => {
   // returns each portfolio's name and amount of funds in the portfolio
   try {
    const user = await req.context.models.User.find() // get current user
    var portfolioInfo = []

    user[0].portfolios.forEach(async port => {
        let portfolio = await req.context.models.Portfolio.findById(port._id);
        const pf = {name: portfolio.name, startingValue: portfolio.startingValue} //
        portfolioInfo.push(pf)

        if (port == user[0].portfolios.slice(-1)[0]) {
            // last portfolio finished calculating
            return res.send(portfolioInfo) // send all porfolio infos.
        }
    });
  } catch (err) {
      // user can't be found
      return res.send(err)
  }
});

//  returns a portfolio by id
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

// return a portfolio history over the last x days
router.get('/history/:portfolioId', async (req, res) => {
  let interval = req.query.days;
  let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
  interval = Math.min(portfolio.history.length, req.query.days)
  rv = portfolio.history.slice(0).slice(-interval)
  return res.send(rv)
})

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

// when a user follows a 
// router.get('/follow/:portfolioId', async (req, res) => {
//   try {

//       const TotalDeposit = 500 // will need to be passed in. HOW MUCH the user is designating to this portfolio
//       const updatedTickers = [] // as current values of the stock are updated they will passed into here.

//       let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
//       portfolio.tickers.forEach(stock => {
//         fetchPrice(stock.symbol, (response) => {
//             // calculate 
//             const allocationCost = TotalDeposit / 100 * stock.allocation // Gets the allocated amount for this stock based on Leaders Allocation
//             const units = allocationCost / response.c  // total allocation cost divided by the current price of the stock.
//             updatedTickers.push({symbol : stock.symbol, allocation: stock.allocation, currValue: allocationCost, units: units})
//         })
//       })

//       while (newStocks.length == portfolio.tickers.length) {
//           // once it reaches however many stocks are in the leaders portfolio (meaning all stocks have been updated) then create new portfolio ref.
//           Console.log("Loaded All Of Em.")
//           const newPort = new models.Portfolio({
//             name: `Copy of ${portfolio.name}`,
//             active: true,
//             useableFunds: 0,
//             startingValue: TotalDeposit,
//             currentValue: TotalDeposit,
//             currentAllocation: 100,
//             tickers: updatedTickers,
//             history: [{date : new Date(), value: TotalDeposit}],
//             user: user1.id,
//           });
//     await portfolio.save()
//           res.send("Success")
//           //await newPort.save()
//           break
//       }
//       //res.send(portfolio)
//   } catch (err) {
//       console.log(err)
//       res.send("Can't Find Portfolio")
//   }
// })

router.get('/hello', (req, res) => {
  return res.send("Hello There...")
  

})
 
// export default router;
module.exports = router;