const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const Session = require('./session');
const Test = require('./test')
const Authentication = require('./authentication')
const History = require('./history')
const Prices = require('./prices')

const routes = { Session:Session, User:User, Portfolio:Portfolio, Stock:Stock, Test:Test, Authentication:Authentication, History:History, Prices:Prices };

module.exports = routes;