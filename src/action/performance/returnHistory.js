const {models} = require('../../models')

const returnHistory = async (portfolioId, days) => {
    let interval = days;
    let portfolio = await models.Portfolio.findById(portfolioId);
    const portfolios = await models.Portfolio.find();
    interval = Math.min(portfolio.history.length, days)
    rv = portfolio.history.slice(0).slice(-interval)
    return rv;
}
returnHistory('5f610a97503816ae8398584c', 1)