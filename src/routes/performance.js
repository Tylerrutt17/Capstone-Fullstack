// import { Router } from 'express';
const { Router } = require('express');
const router = Router();
// Load User model
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

router.get('/overall-performance', async (req, res) => {
    // returns overall percentage of change over specified period of time. /overall-performance?days=2 //
    try {
        const user = await req.context.models.User.find() // current user id
        var totalPortfoliosPercentChange = 0; //

        user[0].portfolios.forEach(async port => {
            let portfolio = await req.context.models.Portfolio.findById(port._id);
            let days = req.query.days // req query days count
            const range = portfolio.history.length >= days && days != 0 ? days : portfolio.history.length
            let dayRange = portfolio.history.slice(0, range)
            // Calculate differences and sum percentage changed.
            let difference = dayRange[0].value - dayRange.slice(-1)[0].value
            let percent = (difference / dayRange[0].value) * 100 // if its negative - its a increase; if its positive - its a decrease.
            let percentChange = percent < 0 ? Math.abs(percent) : -Math.abs(percent) // invert negative and positive signs. 20% = increase, -20% = decrease
            totalPortfoliosPercentChange+=percentChange // add the percent change to the total percent change.

            if (port == user[0].portfolios.slice(-1)[0]) {
                // last portfolio finished calculating
                // send total percentage changed
                return res.send(`${totalPortfoliosPercentChange}`)
            }
        });
    } catch (err) {
        // user can't be found
        return res.send(err)
    }
})

router.get('/total-balance', async (req, res)=> {
    try {
        const user = await req.context.models.User.find() // current user id
        var totalportfolioValue = 0
        user[0].portfolios.forEach(async port => {
            let portfolio = await req.context.models.Portfolio.findById(port._id);
            totalportfolioValue+=portfolio.currentValue

            if (port == user[0].portfolios.slice(-1)[0]) { 
                res.send(`${totalportfolioValue}`) // send total value of summed up portfolios
            }
        });
    } catch (err) {
        // user can't be found
        res.send(err)
    }
})

// will send performance in percentage of any specific portfolio over 'x' amount of days. /213241421?days=2
router.get('/portfolio/:portfolioId', async (req, res) => {
    try {
        let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
        let days = req.query.days // req query days count
        const range = portfolio.history.length >= days && days != 0 ? days : portfolio.history.length
        let dayRange = portfolio.history.slice(0, range)

        // Calculate differences and sum percentage changed.
        let difference = dayRange[0].value - dayRange.slice(-1)[0].value
        let percent = (difference / dayRange[0].value) * 100 // if its negative - its a increase; if its positive - its a decrease.
        let percentChange = percent < 0 ? Math.abs(percent) : -Math.abs(percent) // invert negative and positive signs. 20% = increase, -20% = decrease
        res.send(`${percentChange}`)

    } catch (err) {
        res.send("Can't Find Portfolio")
    }
})

router.get('/performance-graph', async (req, res) => {
    // returns overall percentage of change over specified period of time. /overall-performance?days=2
    // try {
    //     const user = await req.context.models.User.find() // current user id
    //     var histories = []

    //     user[0].portfolios.forEach(async port => {
    //         const portfolio = await req.context.models.Portfolio.findById(port._id);
    //         const days = req.query.days // req query days count
    //         const history = portfolio.history

    //         if (port == user[0].portfolios.slice(-1)[0]) {
    //             // last portfolio finished calculating
    //             // send total percentage changed
    //             res.send(`${totalPortfoliosPercentChange}`)
    //         }
    //     });
    // } catch (err) {
    //     // user can't be found
    //     res.send(err)
    // }
    res.send("i m alive")
})

// sends history of any portfolio by the id.
router.get('/history/:portfolioId', async (req, res) => {
    let interval = req.query.days;
    let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
    //console.log("Port Length", portfolio.history)
    interval = Math.min(portfolio.history.length, req.query.days)
    rv = portfolio.history.slice(0).slice(-interval)
    //console.log(rv)
    console.log("first", rv[0], "last", rv.slice(-1)[0])
  return res.send(rv)
})

module.exports = router;

  