const { models } = require('../../models');

const copyLeader = async (uPortfolio, lPortfolio) => {
    // de allocate all stock in portfolio
    uPortfolio.tickers.forEach( async (ticker) => {
        await allocate(uPortfolio._id, -ticker.allocation, ticker.symbol)
    })
    // remove all tickers from portfolio
    await models.Portfolio.updateOne({ _id: uPortfolio._id },
        { tickers: []})
    // each ticker in leader portfolio, allocate in user portfolio
    lPortfolio.tickers.forEach( async (ticker) => {
        await allocate(uPortfolio._id, ticker.desiredAllocation, ticker.symbol)
    })
}


module.exports = copyLeader