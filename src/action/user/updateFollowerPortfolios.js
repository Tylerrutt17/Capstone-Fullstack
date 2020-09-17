const { models } = require('../../models');
const copyLeader = require('./copyLeader')

const updateFollowerPortfolios = async () => {
    let portfolios = models.Portfolio.find() // all portfolios
    let lPortfolios = portfolios.filter(p => p.followers.length > 0) // leader portfolios
    lPortfolios.forEach( async (portfolio) => {
        portfolio.followers.forEach( async (pID) => {
            await copyLeader(pID, portfolio._id)
        })
    })
}

module.exports = updateFollowerPortfolios