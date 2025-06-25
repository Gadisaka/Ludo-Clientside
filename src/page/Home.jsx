import img from "../assets/ludoimage.png";
import { Link } from "react-router-dom";

const balance = 230.0;
const recentRooms = [
  { id: "#R123", avatar: "🦁", players: 2 },
  { id: "#X456", avatar: "🐍", players: 2 },
  { id: "#Z789", avatar: "🐯", players: 2 },
];

const leaderboard = [
  { name: "@Bir***2", xp: 220, emoji: "👑" },
  { name: "@Nat***1", xp: 190, emoji: "⚡" },
  { name: "@Rob***9", xp: 150, emoji: "🔥" },
];

function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start p-5 bg-gray-900 gap-5">
      {/* 🟣 Sidebar Neon Panel */}

      <aside className="w-full md:w-1/4 bg-white/5 backdrop-blur-md rounded-xl shadow-lg p-4 border border-purple-500/40">
        <h2 className="text-purple-300 font-semibold text-lg mb-2">
          Leaderboard
        </h2>
        <ul className="space-y-2 text-white text-sm">
          {leaderboard.map((user, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md"
            >
              <span className="flex items-center gap-2">
                {user.emoji} {user.name}
              </span>
              <span className="text-yellow-400">{user.xp} XP</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex flex-col items-center gap-5 w-full md:w-3/4">
        <div className="w-full bg-gray-800 py-4 px-4 rounded-xl text-xl font-bold text-white flex justify-between items-center shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/30 transition">
          <h1 className="flex items-center gap-1">
            Balance:{" "}
            <span className="text-yellow-400 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" fill="#FFD700" />
                <ellipse cx="12" cy="16" rx="7" ry="2" fill="#F6C700" />
                <circle cx="12" cy="12" r="7" fill="#FFE066" />
                <ellipse cx="12" cy="10" rx="4" ry="1.2" fill="#FFF9C4" />
              </svg>{" "}
              {balance}
            </span>
          </h1>
          <button className="px-4 py-1 bg-yellow-500 text-white rounded-full  transition shadow-lg hover:shadow-blue-400/40">
            Deposit
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 text-white bg-gray-800 p-6 rounded-xl shadow-xl max-w-sm w-full">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg blur-sm bg-gradient-to-r from-red-400 via-yellow-400 to-purple-500 opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <img
              src={img}
              alt="Ludo Game"
              className="w-[100px] relative rounded-lg shadow-lg group-hover:scale-105 transition duration-300"
            />
          </div>
          <Link className="w-full" to="/game">
            <button className="px-4 py-2 w-full text-white rounded-lg font-bold tracking-wide bg-gradient-to-r from-red-500 via-yellow-500 via-green-400 via-blue-500 to-purple-600 bg-[length:300%_300%] animate-gradient-x transition duration-500 hover:scale-105 hover:rotate-1">
              PLAY!!
            </button>
          </Link>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-2 text-white mt-2">
          <h2 className="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-1">
            Recent Rooms
          </h2>
          <ul className="flex flex-col gap-2 text-sm">
            {recentRooms.map((room, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-700 p-2 rounded-md hover:bg-gray-600 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{room.avatar}</span>
                  <span>{room.id}</span>
                </div>
                <span className="text-gray-400">{room.players} players</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-sm mt-6 p-4 rounded-xl bg-gray-800 text-gray-300">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-1">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-sm space-y-1 text-gray-400">
            <li>Deposit money to your account</li>
            <li>Join a game room or create one</li>
            <li>Roll, compete, and win rewards</li>
          </ol>
        </div>
      </main>
    </div>
  );
}

export default Home;
