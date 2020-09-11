const createUser = async (req,res,next) => {
    db = res.db
    saltRounds = res.saltRounds
    bcrypt = res.bcrypt
    let hash = await bcrypt.hash(req.body.password, saltRounds)
    const searchRegExp = /'/g;
    const replaceWith = "''";
    const result = req.body.about.replace(searchRegExp, replaceWith)
    // let insertion = await db.none(`INSERT INTO users (username, email, password, mentor, about, zipcode) VALUES ($1, $2, $3, $4, $5, $6)`, 
    // [req.body.username, req.body.email, hash, req.body.mentorBool, result, parseInt(req.body.zipcode)])
    // let newUser = await db.one(`SELECT * FROM users where username = '${req.body.username}'`)
    // await db.none(`INSERT INTO skills (id, product_management, design, machine_learning, data_science, software_engineering, web_development) VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
    // [newUser.id, 'f', 'f', 'f', 'f', 'f', 'f'])
    next()
}

module.exports = createUser
