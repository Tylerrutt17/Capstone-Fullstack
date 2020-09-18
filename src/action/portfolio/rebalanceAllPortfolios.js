const { models } = require('../../models');
const allocate = require('./allocateStock').allocate

const rebalanceAllPortfolios = async () => {
    // Observe Each Portfolio Object
    const docs = await models.Portfolio.find()
    // docs.forEach( async (portfolio)=> {
    //     await rebalancePortfolio(portfolio)
    // })
    for (let i = 0; i < docs.length; i++) {
        let portfolio = docs[i]
        await rebalancePortfolio(portfolio)
    }
}

const rebalancePortfolio = async (p) => {
    // p.tickers.forEach( async (ticker) => {
    //     await allocate(p._id, ticker.desiredAllocation, ticker.symbol)
    // })
    for (let i = 0; i < p.tickers.length; i++) {
        let ticker = p.tickers[i]
        await allocate(p._id, ticker.desiredAllocation, ticker.symbol)
    }
}

module.exports = rebalanceAllPortfolios;

// const deAllocatePortfolio = async (p) => {
//     let allTickers = p.tickers
//     p.tickers.forEach( async (ticker) => {
//        await allocateStock(p._id, -ticker.allocation, ticker.symbol)
//     })
// }

// const reAllocatePortfolio = async (p) => {
//     let allTickers = p.tickers
//     p.tickers.forEach( async (ticker) => {
//        await allocateStock(p._id, ticker.desiredAllocation, ticker.symbol)
//     })
// }