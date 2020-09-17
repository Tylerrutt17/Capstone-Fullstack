const finnhub = require('finnhub');
const finnKey = require('../../../config/keys.js').finnKey

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = finnKey
const finnhubClient = new finnhub.DefaultApi()

const returnSymbols = () => {
  finnhubClient.stockSymbols("US", (error, data, response) => {
    console.log(data)
  });
}
// returnSymbols()


module.exports = returnSymbols
