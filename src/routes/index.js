const User = require('./user');
const Portfolio = require('./portfolio');
const Session = require('./session');
const Test = require('./test')
const Authentication = require('./authentication')
const History = require('./history')
const Prices = require('./prices')
<<<<<<< HEAD
const Performance = require('./performance')

const routes = { Session:Session, User:User, Portfolio:Portfolio, Test:Test, Authentication:Authentication, History:History, Prices:Prices, Performance:Performance };
=======
const Auth = require('./auth')

const routes = { Session:Session, User:User, Portfolio:Portfolio, Stock:Stock, Test:Test, Authentication:Authentication, History:History, Prices:Prices, Auth:Auth };
>>>>>>> 6d67d07df4ba170b99d50e97836caabf2bffb966

module.exports = routes;