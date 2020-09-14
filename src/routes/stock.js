
const { Router } = require('express');
const router = Router();

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

module.exports = router;