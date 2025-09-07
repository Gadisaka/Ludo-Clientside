import img from "../assets/ludoimage.png";
import { Link, useNavigate } from "react-router-dom";
import { Download, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import useWalletStore from "../store/walletStore";
import useAdsStore from "../store/adsStore";

function Home() {
  const navigate = useNavigate();
  const { balance, getBalance } = useWalletStore();
  const { ads, socialLinks, fetchAds, getCurrentImage } = useAdsStore();

  // State for rotating images
  const [currentImageIndex, setCurrentImageIndex] = useState({
    adcode_1: 0,
    adcode_2: 0,
    adcode_3: 0,
  });

  // Fetch balance and ads on component mount
  useEffect(() => {
    getBalance();
    fetchAds();
  }, [getBalance, fetchAds]);

  // Set up image rotation for multiple images
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = { ...prev };

        // Rotate adcode_1 images
        if (ads.adcode_1 && ads.adcode_1.length > 1) {
          newIndex.adcode_1 = (prev.adcode_1 + 1) % ads.adcode_1.length;
        }

        // Rotate adcode_2 images
        if (ads.adcode_2 && ads.adcode_2.length > 1) {
          newIndex.adcode_2 = (prev.adcode_2 + 1) % ads.adcode_2.length;
        }

        // Rotate adcode_3 images
        if (ads.adcode_3 && ads.adcode_3.length > 1) {
          newIndex.adcode_3 = (prev.adcode_3 + 1) % ads.adcode_3.length;
        }

        return newIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(rotationInterval);
  }, [ads]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-4 bg-gray-900">
      <div className="w-full h-32 bg-white rounded-lg border-gray-300 flex justify-center items-center text-center mt-2 overflow-hidden">
        {ads.adcode_1 && ads.adcode_1.length > 0 ? (
          <img
            src={
              getCurrentImage("adcode_1", currentImageIndex.adcode_1)?.url ||
              getCurrentImage("adcode_1", currentImageIndex.adcode_1)
            }
            alt="Advertisement"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div>
            {/* adcode_1 */}
            <h1 className="text-black text-lg font-bold mb-1">የማስታወቂያ ቦታ</h1>
            <p className="text-gray-500 text-xs">320x100px</p>
          </div>
        )}
      </div>
      <div className="w-full h-[200px] md:h-[315px] bg-white relative overflow-hidden">
        {ads.adcode_2 && ads.adcode_2.length > 0 ? (
          <img
            src={
              getCurrentImage("adcode_2", currentImageIndex.adcode_2)?.url ||
              getCurrentImage("adcode_2", currentImageIndex.adcode_2)
            }
            alt="Banner Advertisement"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="text-center text-black">
                {/* adcode_2 */}
                <h1 className="text-2xl md:text-4xl font-bold mb-2">የባነር ቦታ</h1>
                <p className="text-sm md:text-lg opacity-90">Banner Space</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 text-black/50 text-xs">
              1000x315px
            </div>
          </>
        )}
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
              {balance !== undefined
                ? `${balance.toFixed(2)} ብር`
                : "Loading..."}
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
        <div className="w-full h-32 bg-white rounded-lg border-gray-300 flex justify-center items-center text-center mt-2 overflow-hidden">
          {ads.adcode_3 && ads.adcode_3.length > 0 ? (
            <img
              src={
                getCurrentImage("adcode_3", currentImageIndex.adcode_3)?.url ||
                getCurrentImage("adcode_3", currentImageIndex.adcode_3)
              }
              alt="Mobile Advertisement"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div>
              {/* adcode_3 */}
              <h1 className="text-black text-lg font-bold mb-1">የማስታወቂያ ቦታ</h1>
              <p className="text-gray-500 text-xs">320x100px</p>
            </div>
          )}
        </div>

        {/* Social Media Links */}
        {(socialLinks.facebook ||
          socialLinks.tiktok ||
          socialLinks.instagram ||
          socialLinks.youtube ||
          socialLinks.telegram) && (
          <div className="w-full max-w-sm p-4 rounded-xl bg-gray-800 text-gray-300">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-600 pb-1">
              Follow Us
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                >
                  TikTok
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-pink-600 text-white rounded-lg text-sm hover:bg-pink-700 transition-colors"
                >
                  Instagram
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  YouTube
                </a>
              )}
              {socialLinks.telegram && (
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Telegram
                </a>
              )}
            </div>
          </div>
        )}

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
