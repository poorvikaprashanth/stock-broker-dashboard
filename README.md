# Stock Broker Client Web Dashboard

## Project Overview
The Stock Broker Client Web Dashboard is a real-time web-based application that simulates a stock trading environment. It allows multiple users to log in, subscribe to supported stock ticker codes, and receive live stock price updates without refreshing the page.

The application provides a clean and intuitive interface where users can monitor stock price changes in real time. It demonstrates asynchronous data streaming using WebSockets and supports multiple concurrent users with independent dashboards.

Stock prices are simulated using a random number generator and updated every second to mimic real-time stock market behavior.

---

## System Architecture
The application follows a **client–server architecture**:

- **Frontend**: Built using React (Vite) with Tailwind CSS for a modern dark-themed UI.
- **Backend**: Built using Node.js with Express.js as the HTTP server and Socket.IO for real-time communication.
- **Communication**: WebSocket-based real-time data transfer.

Each browser tab establishes a separate WebSocket connection, enabling multiple users to interact with the system simultaneously.

---

## Supported Stocks
The application currently supports the following stock ticker codes:
- GOOG (Google)
- TSLA (Tesla)
- AMZN (Amazon)
- META (Meta)
- NVDA (NVIDIA)

---

## Workflow
1. User logs in using a valid email ID (UI-level validation).
2. User is redirected to the dashboard.
3. User subscribes to one or more stock ticker codes.
4. Backend generates random stock prices every second.
5. Backend pushes updated prices to subscribed users via Socket.IO.
6. Dashboard updates stock prices in real time without page refresh.

---

## Users
The system supports the following user type:

### Client (Stock User)
- Represents an individual monitoring stock prices.
- Each browser tab represents a separate user session.

---

## Roles and Capabilities

### Client User Roles
1. User logs in using an email address and a dummy password.
2. User views a list of supported stocks.
3. User subscribes to selected stocks.
4. User receives real-time stock price updates.
5. User can unsubscribe from stocks at any time.
6. User can open multiple browser tabs to simulate multiple users.
7. User can log out of the application.

---

## Real-Time Update Mechanism
- Stock prices are updated every second using a random number generator.
- Socket.IO is used to push updates from the backend to the frontend.
- Each user receives updates only for the stocks they have subscribed to.
- Updates occur asynchronously without any page reload.

---

## Technologies Used

### Frontend Technologies
- React (Vite)
- TypeScript
- Tailwind CSS
- HTML5
- CSS3

### Backend Technologies
- Node.js
- Express.js (used as HTTP server framework)
- Socket.IO (WebSocket-based real-time communication)

---

## Prerequisites
- Node.js (LTS recommended)
- npm
- Modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge)

---

## Setup Required
- Visual Studio Code / Any modern code editor
- Node.js installed on the system
- Internet browser

---

## Running the Project

### 1. Clone the Repository
```bash
git clone https://github.com/poorvikaprashanth/stock-broker-dashboard.git
cd stock-broker-dashboard
```

### 2. Install Frontend Dependencies
```bash
npm install
npm install socket.io-client
```

### 3. Start the Backend Server
```bash
cd server
node index.js
```

### 4. Start the Frontend Application
Open a new terminal window:
```bash
npm run dev
```

### 5. Open the Application in Browser
```
http://localhost:5173
```


## Usage Instructions

- Enter a valid Gmail ID and a dummy password to log in.
- Subscribe to one or more stock ticker codes.
- Observe live stock price updates every second.
- To test multiple users, open the application in multiple browser tabs or windows.

## Notes

Authentication is simulated for demonstration purposes.
No real stock market APIs are used.
Stock prices are randomly generated.
Each browser tab represents a separate user session.

## Conclusion

The Stock Broker Client Web Dashboard effectively demonstrates real-time web application development using modern frontend and backend technologies. It showcases asynchronous communication, multi-user support, and a responsive UI, making it suitable for academic demonstrations and real-time system design projects.
