const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Stock prices
let STOCKS = {
  GOOG: 1200,
  TSLA: 900,
  AMZN: 1500,
  META: 800,
  NVDA: 1100,
};

// socket.id → subscriptions
const subscriptions = {};

io.on("connection", (socket) => {
  subscriptions[socket.id] = [];

  socket.on("subscribe", (stock) => {
    if (!subscriptions[socket.id].includes(stock)) {
      subscriptions[socket.id].push(stock);
    }
  });

  socket.on("unsubscribe", (stock) => {
    subscriptions[socket.id] =
      subscriptions[socket.id].filter((s) => s !== stock);
  });

  socket.on("disconnect", () => {
    delete subscriptions[socket.id];
  });
});

// Update prices every second
setInterval(() => {
  for (let s in STOCKS) {
    STOCKS[s] += Math.random() * 20 - 10;
    STOCKS[s] = Number(STOCKS[s].toFixed(2));
  }

  for (const id in subscriptions) {
    const data = {};
    subscriptions[id].forEach((s) => (data[s] = STOCKS[s]));
    io.to(id).emit("price-update", data);
  }
}, 1000);

server.listen(4000, () =>
  console.log("WebSocket server running on http://localhost:4000")
);
