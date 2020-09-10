// import { Router } from 'express';
const { Router } = require('express');
 
const router = Router();

router.get('/', async (req, res) => {
  const currentUser = await req.context.models.User.findById(
    req.context.currentUser.id,
  );
  return res.send(user);
});

module.exports = router;