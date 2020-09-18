const { models } = require('../../models');
const allocate = require('../portfolio/allocateStock').allocate

const copyLeader = async (uPortfolioID, lPortfolioID) => {
    // pull the portfolios
    let uPortfolio = await models.Portfolio.findById(uPortfolioID)
    let lPortfolio = await models.Portfolio.findById(lPortfolioID)
    // de allocate all stock in portfolio
    // uPortfolio.tickers.forEach( async (ticker) => {
    //     await allocate(uPortfolio._id, 0, ticker.symbol)
    // })
    for (let i = 0; i < uPortfolio.tickers.length; i++) {
        await allocate(uPortfolio._id, 0, uPortfolio.tickers[i].symbol)
    }
    // remove all tickers from portfolio
    await models.Portfolio.updateOne({ _id: uPortfolio._id },
        { tickers: []})
    // each ticker in leader portfolio, allocate in user portfolio
    // lPortfolio.tickers.forEach( async (ticker) => {
    //     await allocate(uPortfolio._id, ticker.desiredAllocation, ticker.symbol)
    // })
    for (let j = 0; j < lPortfolio.tickers.length; j++) {
        let ticker = lPortfolio.tickers[j]
        await allocate(uPortfolio._id, ticker.desiredAllocation, ticker.symbol)
    }
}


module.exports = copyLeader