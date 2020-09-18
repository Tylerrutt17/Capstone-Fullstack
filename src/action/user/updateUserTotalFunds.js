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
    const allPorts = await models.Portfolio.find()
    const userPorts = allPorts.filter(p=> p.user.toString() == u._id.toString())
    let newValues = userPorts.map(p => p.currentValue)
    let allFunds = sum(newValues)
    // update user with summed portfolio values
    await models.User.updateOne({ _id: u._id },
        { totalFunds: allFunds})
        // { totalFunds: getPortfolioValues(u)})
}
module.exports = updateAllUsers
