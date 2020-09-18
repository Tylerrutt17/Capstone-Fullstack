// import { Router } from 'express';
const { Router } = require('express');
 
const router = Router();
 
// fetches a list of users doesn't get any input parameters from the request.
router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});
 
// has access to the user identifier to read the correct user from the MongoDB database.
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

router.get('/followers', async (req, res)=> {
  const user = await req.context.models.User.find(); // needs to find the current user by id.
  return res.send(`${user.followers}`);
})

router.get('/all-leaders', async (req, res) => { // filters out non leaders and sends list of leaders
  const allUsers = await req.context.models.User.find();
  const leaders = allUsers.filter(user=>user.leader == true)
  res.send(leaders)
})
 
// export default router;
// exports.router = router;
module.exports = router