const dbuser = "dmitchell217"
const dbuserpassword = "AAAbbbCCC"
const dbname = "Capstone"
const server = "cluster0.iqhgq.mongodb.net"
const uri = `mongodb+srv://${dbuser}:${dbuserpassword}@${server}/${dbname}?retryWrites=true&w=majority`;
const finnKey = `btdo5q748v6p1d4q5sp0`

module.exports = {
    mongoURI: uri,
    secretOrKey: "secret",
    finnKey:finnKey
  };
// module.exports = uri

// exports.uri = uri
