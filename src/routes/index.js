const User = require('./user');
const Portfolio = require('./portfolio');
const Session = require('./session');
const Test = require('./test')
const Authentication = require('./authentication')
const History = require('./history')
const Prices = require('./prices')
const Performance = require('./performance')
const Auth = require('./auth')

const routes = { Session:Session, User:User, Portfolio:Portfolio, Test:Test, Authentication:Authentication, History:History, Prices:Prices, Performance:Performance, Auth:Auth };



module.exports = routes;