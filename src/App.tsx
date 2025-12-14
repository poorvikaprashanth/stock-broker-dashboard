import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const STOCKS = [
  { code: "GOOG", color: "border-blue-500 text-blue-400" },
  { code: "TSLA", color: "border-red-500 text-red-400" },
  { code: "AMZN", color: "border-orange-500 text-orange-400" },
  { code: "META", color: "border-purple-500 text-purple-400" },
  { code: "NVDA", color: "border-green-500 text-green-400" },
];

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export default function App() {
  const [email, setEmail] = useState(
    sessionStorage.getItem("email") || ""
  );
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    !!sessionStorage.getItem("email")
  );
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [subs, setSubs] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("price-update", (data) => {
      setPrices(data);
    });
    return () => socket.off("price-update");
  }, []);

  const handleLogin = () => {
    if (!gmailRegex.test(email)) {
      setError("Enter a valid Gmail address");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    sessionStorage.setItem("email", email);
    setLoggedIn(true);
  };

  // 🔐 LOGIN PAGE
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <div className="bg-gray-900 p-8 rounded-2xl w-96 border border-gray-700">
          <h1 className="text-3xl text-cyan-400 text-center mb-4">
            Stock Broker Login
          </h1>

          <input
            placeholder="Gmail ID"
            className="w-full p-3 mb-3 bg-black text-white border border-gray-700 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-black text-white border border-gray-700 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-cyan-500 text-black py-3 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 📊 DASHBOARD
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl text-cyan-400">
          Stock Broker Dashboard
        </h1>
        <button
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {STOCKS.map((s) => (
          <div
            key={s.code}
            className={`p-6 rounded-2xl border ${s.color} bg-gray-900 shadow-lg`}
          >
            <h2 className="text-2xl font-bold">{s.code}</h2>

            {subs.includes(s.code) ? (
              <>
                <p className="mt-2 text-lg">
                  ₹ {prices[s.code] ?? "--"}
                </p>
                <button
                  onClick={() => {
                    socket.emit("unsubscribe", s.code);
                    setSubs(subs.filter((x) => x !== s.code));
                  }}
                  className="mt-4 bg-gray-700 px-4 py-2 rounded"
                >
                  Unsubscribe
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  socket.emit("subscribe", s.code);
                  setSubs([...subs, s.code]);
                }}
                className="mt-4 bg-cyan-600 px-4 py-2 rounded text-black font-semibold"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
