
// need to get db in here
const checkIfExist = async (req, res, next)=> {
    db = res.db
    let result = await db.oneOrNone(`SELECT * FROM users WHERE username='${req.body.username}'`)
    result != null ? res.send(`User Already Exists`) : next()
}

module.exports = checkIfExist
