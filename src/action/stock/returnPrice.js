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
<<<<<<< HEAD
// fetchPrice("AAPL", (response) => {
//     console.log(response);
// })
=======
fetchPrice("AAPL", async (response) => {
    // console.log(response);
    await getPrice(response.o)
})
>>>>>>> 6d67d07df4ba170b99d50e97836caabf2bffb966

const getPrice = (open) => {
    return open
}   

module.exports = {
    fetchPrice,
    // returnTotalPrice
}

// // Stock candles
// finnhubClient.stockCandles("AAPL", "D", 1590988249, 1591852249, {}, (error, data, response) => {
//     console.log(data)
// });
