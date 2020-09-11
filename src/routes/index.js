const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const Session = require('./session');
const Test = require('./test')
const Authentication = require('./authentication')

const routes = { Session:Session, User:User, Portfolio:Portfolio, Stock:Stock, Test:Test, Authentication:Authentication };

module.exports = routes;