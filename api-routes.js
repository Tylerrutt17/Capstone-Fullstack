
// const passport = require('passport')
// const formidable = require("formidable");
// const Strategy = require('passport-local').Strategy
// const fs = require('fs')

// user authentication js files
// const checkIsLoggedIn = require('./public/js/checkIsLoggedIn.js')
// const checkIfExist = require('./public/js/checkIfExist.js')
// const createUser = require('./public/js/createUser.js')

const apiRoutes = (app, db)=>{

    //  this function passed in the database to all routes/middleware
    const passInfo = (req, res, next) => {
        res.db = db
        // res.saltRounds = saltRounds
        // res.bcrypt = bcrypt
        next() 
    }

    app.use(passInfo)
}