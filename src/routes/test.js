const { Router } = require('express');
var path = require('path');
const router = Router();
 
// tests whatever I'm trying to test at the moment
router.get('/', async (req, res) => {
//   return res.send("this is a test");
    res.sendFile(path.resolve(__dirname + './../../site/static/html/register.html'))
});

module.exports = router