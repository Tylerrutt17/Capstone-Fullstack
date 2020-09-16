const { models } = require('../../models');

const sum = (array) => {
    let sum = array.reduce((a, b) => {
        return a + b;
    }, 0);
    return sum
}

const updateAllUsers = async () => {
    // Observe Each User Object
    const docs = await models.User.find()
    const result = docs.forEach( async (user)=> {
        await updateSpecificUser(user)
    })
}

const updateSpecificUser = async (u) => {
    // map through each portfolioid, find the corresponding model, and return its current value\
    var allFunds;
    let rvs = u.portfolios.forEach( async (portfolioId) => {
        let p = await models.Portfolio.findById(portfolioId)
        allFunds = allFunds + p.currentValue
    })
    // update user with summed portfolio values
    await models.User.updateOne({ _id: u._id },
        { totalFunds: allFunds})
}
    
module.exports = updateAllUsers