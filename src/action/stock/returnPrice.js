const finnKey = require('../../../config/keys.js').finnKey

const returnPrice = (symbol) => {

  const socket = new WebSocket(`wss://ws.finnhub.io?token=${finnKey}`);

  // Connection opened -> Subscribe
  socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({'type':'subscribe', 'symbol': symbol}))
      // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
      // socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
  });

  // Unsubscribe
  var unsubscribe = function(symbol) {
      socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
  }
}