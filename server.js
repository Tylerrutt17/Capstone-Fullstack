const express = require('express');
const app = express();
const port = 8000;
const path = require("path");
const bodyParser = require("body-parser");

// db
const {connectDb, models} = require('./src/models/index.js');

// const eS = require('express-session')
// const expressSession = eS(secretInfo().secret)

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, ".", "site")));
// app.use(express.urlencoded({extended: true}))
// app.use(expressSession)


// require("./api-routes")(app, db);//sets the api

// DB Config
connectDb().then(async () => {
    app.listen(port, () =>
      console.log(`Listening on port ${port}!`),
    );
  });

// seed DB - FINISH UPDATING THIS WITH THE REQUIRED FIELDS
const createUsersWithPortfolio = async () => {
    const user1 = new models.User({
      username: 'bob',
      email: 'bob@gmail.com',
      password: '1234',
      leader: true,
      followers: 0
    });
   
    const portfolio1 = new models.Message({
      name: 'My first portfolio',
      funds: 1000,
      percent_allocated: 90,
      active: true,
      asset_num: 3,
      lastRebalance: new Date(),
      user: user1.id,
    });
   
    const stock1 = new models.Message({
      stock: 'AAPl',
      avg_price: 250,
      volume: 2,
      current_value: 250,
      allocation: 50,
      user: user1.id,
      portfolio: portfolio1.id
    });

    const stock2 = new models.Message({
        stock: 'TSLA',
        avg_price: 100,
        volume: 2,
        current_value: 200,
        allocation: 20,
        user: user1.id,
        portfolio: portfolio1.id
      });
   
    const stock3 = new models.Message({
        stock: 'PRPL',
        avg_price: 200,
        volume: 1,
        current_value: 200,
        allocation: 20,
        user: user1.id,
        portfolio: portfolio1.id
    });
   
    await stock1.save();
    await stock2.save();
    await stock3.save();
   
    await user1.save();
    await portfolio1.save();
  };

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
//         models.Message.deleteMany({}),
//       ]);
//     }