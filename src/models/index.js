const mongoose = require('mongoose');
 
const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const Prices = require('./prices');
const History = require('./history');
const uri = require('../../config/keys').mongoURI;
 
const connectDb = () => {
  return (mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }));
};
 
const models = { User:User.User, Portfolio:Portfolio.Portfolio, Stock:Stock.Stock, Prices:Prices.Prices, History:History.History};

exports.connectDb = connectDb;
exports.models = models;

 
// export { connectDb };
 
// export default models;