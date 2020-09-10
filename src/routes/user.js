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
 
// export default router;
exports.router = router;