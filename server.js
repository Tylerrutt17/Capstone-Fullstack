const express = require('express');
const app = express();
const port = 8000;
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const bcrypt = require("bcryptjs");
var schedule = require('node-schedule') // responsible for the timing in which rebalancing of stocks would take place each day. (9:30am est)

// const users = require("./src/routes/users.js"); changed name to authentication
// db
const {connectDb, models} = require('./src/models/index.js');

// router
const routes = require('./src/routes/index.js')

// const eS = require('express-session')
// const expressSession = eS(secretInfo().secret)

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
//   app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, ".", "site")));
// app.use(express.urlencoded({extended: true}))
// app.use(expressSession)

// pass models to every route
app.use(async (req, res, next) => {
    req.context = {
      models,
      bob: await models.User.findByLogin('bob'),
    };
    next();
  });
// // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// login/register routes - 
// app.use("/src/routes/users", users);

app.use("/authentication", routes.Authentication);
app.use('/session', routes.Session);
app.use('/users', routes.User);
app.use('/portfolios', routes.Portfolio);
app.use('/stocks', routes.Stock);
app.use('/test', routes.Test);
// error handling
app.get('*', function (req, res, next) {
    res.status(301).redirect('/not-found');
  });
app.use((error, req, res, next) => {
return res.status(500).json({ error: error.toString() });
});

// DB Config
connectDb().then(async () => {
    app.listen(port, () =>
      console.log(`Listening on port ${port}!`),
    );
  });

//   const message = await req.context.models.Message.create({
//     text: req.body.text,
//     user: req.context.me.id,
//   });
// seed DB

const createUser = async () => {
    let pswrd = await bcrypt.hash('1234', 10)
    console.log(pswrd)
    const user2 = new models.User({
        name: 'David',
        email: 'd@gmail.com',
        password: pswrd,
        leader: true,
        followers: 0
      });
      await user2.save();
}
// createUser()

const createUsersWithPortfolio = async () => {
    
    const user1 = new models.User({
      name: 'bob',
      email: 'bob@gmail.com',
      password: pswrd,
      leader: true,
      followers: 0
    });
   
    const portfolio1 = new models.Portfolio({
      name: 'My first portfolio',
      funds: 1000,
      percent_allocated: 90,
      active: true,
      asset_num: 3,
      lastRebalance: new Date(),
      user: user1.id,
    });
   
    const stock1 = new models.Stock({
      stock: 'AAPl',
      avg_price: 250,
      volume: 2,
      current_value: 250,
      allocation: 50,
      user: user1.id,
      portfolio: portfolio1.id
    });

    const stock2 = new models.Stock({
        stock: 'TSLA',
        avg_price: 100,
        volume: 2,
        current_value: 200,
        allocation: 20,
        user: user1.id,
        portfolio: portfolio1.id
      });
   
    const stock3 = new models.Stock({
        stock: 'PRPL',
        avg_price: 200,
        volume: 1,
        current_value: 200,
        allocation: 20,
        user: user1.id,
        portfolio: portfolio1.id
    });
   
    await user1.save();
    await portfolio1.save();
    await stock1.save();
    await stock2.save();
    await stock3.save();
  };

//  models.Portfolio.find().then(data=>console.log(data));
//   createUsersWithPortfolio()

// const stock = await req.context.models.Portfolio.findById(
//     req.params.stockId,
//   );









// installed packages
// bcryptjs: used to hash passwords before we store them in our database
// body-parser: used to parse incoming request bodies in a middleware
// concurrently: allows us to run our backend and frontend concurrently and on different ports
// express: sits on top of Node to make the routing, request handling, and responding easier to write
// is-empty: global function that will come in handy when we use validator
// jsonwebtoken: used for authorization
// mongoose: used to interact with MongoDB
// passport: used to authenticate requests, which it does through an extensible set of plugins known as strategies
// passport-jwt: passport strategy for authenticating with a JSON Web Token (JWT); lets you authenticate endpoints using a JWT
// validator: used to validate inputs (e.g. check for valid email format, confirming passwords match)


// If you want to re-initialize your database on every Express server start, you can add a condition to your function:
// connectDb().then(async () => {
//     if (eraseDatabaseOnSync) {
//       await Promise.all([
//         models.User.deleteMany({}),
//         models.Portfolio.deleteMany({}),
//         models.Stock.deleteMany({}),
//       ]);
//     }