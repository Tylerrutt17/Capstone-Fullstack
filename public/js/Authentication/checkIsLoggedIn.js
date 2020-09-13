const checkIsLoggedIn = (req,res,next) =>{
    db = res.db
    if(req.isAuthenticated()) return next()
    return res.redirect('/login')
}

module.exports = checkIsLoggedIn