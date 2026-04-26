import { Heart, Wind } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CandleSectionProps {
  onBlow: () => void;
  candlesBlown: boolean;
}

export function CandleSection({ onBlow, candlesBlown }: CandleSectionProps) {
  const [flames, setFlames] = useState([true, true, true, true, true]);

  const handleBlowCandles = () => {
    // Animate candles going out one by one
    flames.forEach((_, index) => {
      setTimeout(() => {
        setFlames(prev => {
          const newFlames = [...prev];
          newFlames[index] = false;
          return newFlames;
        });
      }, index * 200);
    });

    setTimeout(() => {
      onBlow();
    }, flames.length * 200 + 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-200 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 text-center w-full max-w-md">
        {/* Cake first */}

        <div className="relative mb-8">
          <div className="relative inline-block">
            {/* Cake */}
            <div className="relative">
              {/* Top layer (cream cheese) */}
              <div className="w-64 h-16 rounded-t-full bg-gradient-to-b from-yellow-100 to-yellow-200 border-4 border-yellow-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* Middle layer */}
              <div className="w-64 h-12 bg-gradient-to-b from-orange-200 to-orange-300 border-x-4 border-orange-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Bottom layer */}
              <div className="w-64 h-8 rounded-b-lg bg-gradient-to-b from-yellow-700 to-yellow-800 border-4 border-t-0 border-yellow-800 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent" />
              </div>

              {/* Plate */}
              <div className="absolute -bottom-2 -left-4 w-72 h-3 rounded-full bg-gradient-to-b from-gray-300 to-gray-400 shadow-lg" />

              {/* Candles */}
              <div className="absolute -top-16 left-0 right-0 flex justify-center gap-4">
                {flames.map((isLit, index) => (
                  <div key={index} className="relative">
                    {/* Candle stick */}
                    <div className="w-3 h-12 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-sm border-2 border-pink-500 relative">
                      <div className="absolute top-1 left-0 right-0 h-1 bg-pink-200 opacity-50" />
                      <div className="absolute top-3 left-0 right-0 h-1 bg-pink-500 opacity-30" />
                    </div>

                    {/* Flame */}
                    {isLit && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                          <div className="w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full animate-flicker" />
                          <div className="absolute inset-0 w-4 h-6 bg-gradient-to-t from-orange-500 via-orange-300 to-transparent rounded-full animate-flicker opacity-70"
                            style={{ animationDelay: '0.1s' }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text below cake */}
        <h2
          className="text-3xl mb-6 animate-pulse"
          style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}
        >
          Tiup Lilinnya Yuk! 🎂
        </h2>

        {!candlesBlown && (
          <button
            onClick={handleBlowCandles}
            className="px-8 py-4 rounded-full shadow-2xl transform transition-all hover:scale-110 hover:shadow-pink-300 active:scale-95 flex items-center gap-3 mx-auto"
            style={{ backgroundColor: '#F7A4BA', color: '#5D3A4A' }}
          >
            <Wind className="w-6 h-6" />
            <span>Tiup Lilin</span>
            <Wind className="w-6 h-6" />
          </button>
        )}

        {candlesBlown && (
          <div className="animate-fade-in">
            <p className="text-2xl mb-4" style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}>
              Yeayy! 🎉
            </p>
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-pink-400 animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes flicker {
          0%, 100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.1) translateY(-2px);
            opacity: 0.9;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-flicker {
          animation: flicker 0.3s ease-in-out infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
