const mongoose = require('mongoose');
 
const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const uri = require('../../config/keys').mongoURI;
 
const connectDb = () => {
  return (mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }));
};
 
const models = { User:User.User, Portfolio:Portfolio.Portfolio, Stock:Stock.Stock };

exports.connectDb = connectDb;
exports.models = models;

 
// export { connectDb };
 
// export default models;