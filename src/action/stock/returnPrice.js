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
fetchPrice("AAPL", async (response) => {
    // console.log(response);
    await getPrice(response.o)
})

const getPrice = (open) => {
    // return open
    return 4
}   

module.exports = {
    fetchPrice,
    // returnTotalPrice
}

// // Stock candles
// finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
//     console.log(data)
// });
