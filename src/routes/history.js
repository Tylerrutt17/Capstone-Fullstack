// import { Router } from 'express';
const { Router } = require('express');

 
const router = Router();
//  return all histories saved in the database
router.get('/', async (req, res) => {
  const histories = await req.context.models.History.find();
  return res.send(histories);
});
//  return a history by id
router.get('/:historyId', async (req, res) => {
  const history = await req.context.models.History.findById(
    req.params.historyId,
  );
  return res.send(history);
});
//  return a history by portfolio id

//  return a history by portfolio id and date
router.get('/:historyId/:date', async (req, res) => {
    const history = await req.context.models.History.findById(
      req.params.historyId,
    );
    // const history_val = await history.find(
    //     {
    //         "date": req.params.date
    //       }
    // )
    var historyAtDate = history.filter(history => history.date == req.params.date);
    return res.send(historyAtDate);
  });
//  create a new history
router.post('/', async (req, res) => {
  const history = await req.context.models.History.create({
    totalFunds: req.body.funds,
    portfolio: req.body.portfolio,
    last_update: new Date(),
  });
 
  return res.send(history);
});
// export default router;
module.exports = router;