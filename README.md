# Stock Broker Client Web Dashboard

## Description
This project is a real-time Stock Broker Client Web Dashboard developed using React (Vite), TypeScript, Tailwind CSS, Node.js, Express, and Socket.IO.

The application allows users to log in using an email address, subscribe to selected stocks, and view live stock price updates without refreshing the page. Multiple users can access the dashboard simultaneously, and each user’s dashboard updates asynchronously.

Stock prices are simulated using a random number generator and are updated every second.

---

## Features
- Email-based login (UI-based validation)
- Subscription to supported stocks
- Live stock price updates without page refresh
- Supports multiple users simultaneously
- Asynchronous dashboard updates


---

## Supported Stocks
- GOOG
- TSLA
- AMZN
- META
- NVDA

---

## Technologies Used
- React (Vite)
- TypeScript
- Tailwind CSS
- Node.js
- Express
- Socket.IO

---

## How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/stock-broker-dashboard.git
cd stock-broker-dashboard

### 2. Install frontend dependencies
```bash
npm install
npm install socket.io-client