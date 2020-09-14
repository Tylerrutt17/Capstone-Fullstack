// import { Router } from 'express';
const { Router } = require('express');
const router = Router();

const schedule = require('node-schedule'); // scheduling at times

// Finhub stuff
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

//  return all Stocks saved in the database
router.get('/', async (req, res) => {
  const stocks = await req.context.models.Stock.find();
  return res.send(stocks);
});
//  return a stock by id
router.get('/:stockId', async (req, res) => {
  const stock = await req.context.models.Stock.findById(
    req.params.stockId,
  );
  return res.send(stock);
});
//  add a new stock based on a form
router.post('/', async (req, res) => {
  const stock = await req.context.models.Stock.create({
    stock: req.body.stock,
    avg_price: req.body.price, //needs to be fetched from an api
    volume: req.body.volume,
    current_value: req.body.price, //needs to be fetched from an api
    allocation: 0, //needs to be handled by a function
    user: req.context.currentUser.id,
    portfolio: req.body.portfolio, // needs to handled by a function i.e. active 
  });
 
  return res.send(stock);
});
// update a stock based on form
router.put('/update/:stockId', async (req, res) => {
  const stock = await req.context.models.Stock.save({
    stock: req.body.stock,
    avg_price: req.body.price, //needs to be fetched from an api
    volume: req.body.volume,
    current_value: req.body.price, //needs to be fetched from an api
    allocation: 0, //needs to be handled by a function
    user: req.context.currentUser.id,
    portfolio: req.body.portfolio, // needs to handled by a function i.e. active 
    });

    return res.jsonp(stock);
});

// do a fetch and use the method from API. have express.json
 
router.delete('/delete/:stockId', async (req, res) => {
  const stock = await req.context.models.Stock.findById(
    req.params.stockId,
  );
 
  if (stock) {
    await stock.remove();
  }
 
  return res.send(stock);
});



// example call
fetchPrice("AAPL", (response) => {
    console.log(response.o);
    doSomething(response.o)
})

const doSomething = (value) => {
    console.log("value", value)
}


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
 
const updateStockPrices = () => {
    // Runs once per day at 9:30am on mondays through fridays. Extra feature: Observe for holidays. 

    // Observe Each Stock Object

    // PSUEDOCODE
    /* For each stock object, 
        for stock in stocks {
           fetchPrice('ticker', (response)=> {

           })

           set 'currentPrice' to 
        }
    */

      
    // example call
    fetchPrice("AAPL", (response) => {
        console.log(response['o']);
        console.log("hello?")
    })
}

// var j = schedule.scheduleJob(rule, function(){
//   console.log('Today is recognized by Rebecca Black!');
// });

 
// export default router;
// exports.router = router.router;
module.exports = router;