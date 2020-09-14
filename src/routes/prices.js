// import { Router } from 'express';
const { Router } = require('express');

 
const router = Router();
//  return all prices saved in the database
router.get('/', async (req, res) => {
  const prices = await req.context.models.Price.find();
  return res.send(prices);
});
//  return a price by id
router.get('/:priceId', async (req, res) => {
  const price = await req.context.models.Prices.findById(
    req.params.priceId,
  );
  return res.send(price);
});

//  return a price by ticker
router.get('/:ticker', async (req, res) => {
    const price = await req.context.models.Prices.find(
      req.params.ticker,
    );
    return res.send(price);
  });

//  return a price by ticker and date
router.get('/:ticker/:date', async (req, res) => {
    const prices = await req.context.models.Prices.findById(
      req.params.ticker,
    );
    var priceAtDate = prices.filter(price => price.lastUpdate == req.params.date);
    return res.send(priceAtDate);
  });
//  create a new price
router.post('/', async (req, res) => {
  const price = await req.context.models.Prices.create({
    ticker: req.body.ticker,
    prevPrice: req.body.funds, // db fetch command
    currPrice: req.body.portfolio, // api call
    last_update: new Date(),
  });
 
  return res.send(price);
});
// export default router;
module.exports = router;