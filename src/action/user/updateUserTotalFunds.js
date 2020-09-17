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
    // var allFunds = 0;
    // let rvs = u.portfolios.forEach( async (portfolioId) => {
    //     let p = await models.Portfolio.findById(portfolioId)
    //     console.log(p.currentValue)
    //     allFunds = allFunds + p.currentValue
    //     console.log(allFunds)
    // })
    const getPortfolioValues = async (u) => {
        let result = await u.portfolios.map(p => {
            let rv = models.Portfolio.findById(p)
            return rv.currentValue
        })
        return sum(result)
    }
    // update user with summed portfolio values
    await models.User.updateOne({ _id: u._id },
        { totalFunds: getPortfolioValues(u)})
}
    
module.exports = updateAllUsers