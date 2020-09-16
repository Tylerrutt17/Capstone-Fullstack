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
//  return a portfolio by id
router.get('/:portfolioId', async (req, res) => {
  const portfolio = await req.context.models.Portfolio.findById(
    req.params.portfolioId,
  );
  return res.send(portfolio);
  
});
//  create a new portfolio
router.post('/', async (req, res) => {
  const portfolio = await req.context.models.Portfolio.create({
    name: req.body.name,
    user: req.context.currentUser.id,
    funds: 0,
    percent_allocated: 0,
    active: false,
    asset_num: 0,
    last_rebalance: new Date(),
  });
 
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
router.get('/follow/:portfolioId', async (req, res) => {
  try {

      const TotalDeposit = 100 // will need to be passed in with HOW MUCH they are designating to this portfolio
      const newStocks = [] // as current values of the stock are updated they will passed into here.

      let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
      portfolio.tickers.forEach(stock => {
        fetchPrice(stock.symbol, (response) => {
            // calculate 
            const allocationCost = TotalDeposit / 100 * stock.allocation // Gets the allocated amount for this stock based on Leaders Allocation
            const units = allocationCost / response.c  // total allocation cost divided by the current price of the stock.
            newStocks.push({symbol : stock.symbol, allocation: stock.allocation, currValue: allocationCost, units: units})
        })
      })

      while (newStocks.length == portfolio.tickers.length) {
          // once it reaches however many stocks are in the leaders portfolio (meaning all stocks have been updated) then create new portfolio ref.
          Console.log("Loaded All Of Em.")
          // const newPort = new models.Portfolio({
          //   name: `Copy of ${portfolio.name}`,
          //   active: true,
          //   useableFunds: 0,
          //   startingValue: 1000,
          //   currentValue: 1000
          // })
          res.send("Success")
          //await newPort.save()
          break
      }

      //res.send(portfolio)
  } catch (err) {
      console.log(err)
      res.send("Can't Find Portfolio")
  }
})

router.post('/new-portfolio', async (req, res) => {

  let userId = req.context.currentUser

  //   const port = new models.Portfolio({
  //     name: req.body.name,
  //     active: true,
  //     last_rebalance: Date(),
  //     startingValue: req.body.startingValue,
  //     currentValue: req.body.currentValue,
  //     tickers: req.body.tickers, // ['TSLA', 'AMZN', 'AAPL']
  //     tickerAllocations: req.body.tickerAllocations, // [21, 50, 29]
  //     tickerCurrValues: req.body.CurrValues // [25, 40, 32]
  // })
  // await port.save()
  res.send(userId)
})


const addNewPortfolio = async () => {

  const tickers = ['TSLA', 'AMZN', 'AAPL']
  array.forEach(element => {
      fetchPrice(stock.ticker, (response) => {
          
    })
  });

  console.log(tickers)

  // const port = new models.Portfolio({
  //     name: 'tyler',
  //     active: true,
  //     last_rebalance: Date(),
  //     startingValue: 100,
  //     currentValue: 110,
  //     tickers: ['TSLA', 'AMZN', 'AAPL'],
  //     tickerAllocations: [21, 50, 29],
  //     tickerCurrValues: [25, 40, 32]
  // })
  // await port.save()
}
 
// export default router;
module.exports = router;