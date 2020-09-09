const dbuser = "dmitchell217"
const dbuserpassword = "AAAbbbCCC"
const dbname = "Capstone"
const server = "cluster0.iqhgq.mongodb.net"
const uri = `mongodb+srv://${dbuser}:${dbuserpassword}@${server}/${dbname}?retryWrites=true&w=majority`;

// module.exports = {
//     mongoURI: uri,
//     shortened: shortened
//   };
// module.exports = uri

exports.uri = uri
