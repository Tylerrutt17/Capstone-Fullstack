const User = require('./user');
const Portfolio = require('./portfolio');
const Stock = require('./stock');
const Session = require('./session');

const routes = { Session:Session, User:User, Portfolio:Portfolio, Stock:Stock };

module.exports = routes;