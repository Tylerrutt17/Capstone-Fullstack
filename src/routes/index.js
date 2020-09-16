const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const Session = require('./session');
const Test = require('./test')
const Authentication = require('./authentication')
const History = require('./history')
const Prices = require('./prices')
const Auth = require('./auth')

const routes = { Session:Session, User:User, Portfolio:Portfolio, Stock:Stock, Test:Test, Authentication:Authentication, History:History, Prices:Prices, Auth:Auth };

module.exports = routes;