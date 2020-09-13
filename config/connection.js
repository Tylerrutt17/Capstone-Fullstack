const { MongoClient } = require('mongodb');
const dbuser = "dmitchell217"
const dbuserpassword = "AAAbbbCCC"
const dbname = "Capstone"
const server = "cluster0.iqhgq.mongodb.net"
const uri = `mongodb+srv://${dbuser}:${dbuserpassword}@${server}/${dbname}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
mongoose
    .connect(uri, { 
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));