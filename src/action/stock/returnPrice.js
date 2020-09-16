const finnhub = require('finnhub');
const finnKey = require('../../../config/keys.js').finnKey

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnKey
const finnhubClient = new finnhub.DefaultApi()


const fetchPrice = (ticker, callback) => {
    finnhubClient.quote(ticker, (error, data, response) => {
        return callback(data);
    });
}
// example call
// fetchPrice("AAPL", (response) => {
//     console.log(response);
// })

// const returnTotalPrice = async (symbol, units ) => {
//     fetchPrice(symbol, (response) => { 
//         // console.log(units * response.pc)
//         units * response.pc
//      })
// }
// console.log(returnTotalPrice('AAPL', 3))



module.exports = {
    fetchPrice,
    // returnTotalPrice
}

// // Stock candles
// finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
//     console.log(data)
// });
