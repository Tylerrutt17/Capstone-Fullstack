const { Router } = require('express');
var path = require('path');
const router = Router();
const {returnTotalPrice} = require('../action/stock/returnPrice')
 
// tests whatever I'm trying to test at the moment
router.get('/', async (req, res) => {
//   return res.send("this is a test");
    res.send(returnTotalPrice("AAPL", 1))
});

module.exports = router