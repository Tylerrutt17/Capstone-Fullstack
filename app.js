const express = require('express');
const app = express();
const port = 8000;
const path = require("path");

app.use(express.static(path.join(__dirname, ".", "site")));

app.listen(port, ()=>{
    console.log(`Listening on http://localhost:${port}`)
})