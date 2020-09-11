
const request = require('request');

const returnSymbols = () => {

    request('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=btdo5q748v6p1d4q5sp0', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      console.log(body.url);
      console.log(body.explanation);
    });
}

module.exports = returnSymbols
