import img from "../assets/ludoimage.png";
import { Link, useNavigate } from "react-router-dom";
import { Download, Wallet } from "lucide-react";

const balance = 230.0;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 bg-gray-900">
      <div className="w-full h-32 bg-white rounded-lg  border-gray-300 flex justify-center items-center text-center mt-2">
        <div>
          <h1 className="text-black text-lg font-bold mb-1">የማስታወቂያ ቦታ</h1>
          <p className="text-gray-500 text-xs">320x100px </p>
        </div>
      </div>
      <div className="w-full h-[200px] md:h-[315px] bg-white relative overflow-hidden">
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="text-center text-black">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">የባነር ቦታ</h1>
            <p className="text-sm md:text-lg opacity-90">Banner Space</p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-black/50 text-xs">
          1200x315px
        </div>
      </div>

      <main className="flex flex-col items-center gap-5 w-full p-5">
        <div className="w-full bg-gray-800 py-4 px-4 rounded-xl text-xl font-bold text-white flex justify-between items-center shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/30 transition">
          <h1 className="flex items-center gap-1">
            Balance:{" "}
            <span className="text-green-600 flex items-center gap-1">
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
          <button
            onClick={() => navigate("/deposit")}
            className="px-4 py-1 bg-green-500 text-white rounded-full transition shadow-lg hover:shadow-blue-400/40 flex items-center gap-2"
          >
            <Download size={16} />
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

        {/* Mobile Ad Space */}
        <div className="w-full h-32 bg-white rounded-lg  border-gray-300 flex justify-center items-center text-center mt-2">
          <div>
            <h1 className="text-black text-lg font-bold mb-1">የማስታወቂያ ቦታ</h1>
            <p className="text-gray-500 text-xs">320x100px </p>
          </div>
        </div>

        <div className="w-full max-w-sm mt-6 p-4 rounded-xl bg-gray-800 text-gray-300">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-1">
            How It Works
          </h2>
          <ol className="list-decimal list-inside text-sm space-y-1 text-gray-400">
            <li>ገንዘብ አካውንቶ ውስት ያስገቡ</li>
            <li>ጌም ይቀላቀሉ ወይንም አዲስ ይፍተሩ</li>
            <li>የቻወቱ፣ ይወዳደሩ፣ ያሸንፉ።</li>
          </ol>
        </div>
      </main>
    </div>
  );
}

export default Home;
