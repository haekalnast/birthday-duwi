import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onScrollToCandle: () => void;
}

export function HeroSection({ onScrollToCandle }: HeroSectionProps) {
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Balloons */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`balloon-${i}`}
            className="absolute rounded-full animate-float-up"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '-50px',
              width: `${40 + Math.random() * 30}px`,
              height: `${50 + Math.random() * 40}px`,
              backgroundColor: i % 3 === 0 ? '#F7A4BA' : i % 3 === 1 ? '#FFB3C6' : '#FFD6E0',
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 3}s`,
              opacity: 0.7,
            }}
          >
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-pink-300" />
          </div>
        ))}

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute text-yellow-300 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Floating hearts */}
        {[...Array(12)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-pink-300 animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 25}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="mb-8 animate-bounce-slow">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border-2 border-pink-200 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-400" fill="currentColor" />
            <span className="text-sm" style={{ color: '#9D7A88' }}>
              20 Mei 1996
            </span>
            <Sparkles className="w-5 h-5 text-yellow-400" fill="currentColor" />
          </div>
        </div>

        <div className="mb-8">
          {/* Banner */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {['H', 'A', 'P', 'P', 'Y'].map((letter, i) => (
              <div
                key={`happy-${i}`}
                className="w-12 h-14 rounded-lg flex items-center justify-center shadow-lg animate-wave"
                style={{
                  backgroundColor: '#F7A4BA',
                  color: 'white',
                  animationDelay: `${i * 0.1}s`,
                  fontFamily: 'Caveat, cursive',
                  fontSize: '1.5rem',
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {['B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y'].map((letter, i) => (
              <div
                key={`birthday-${i}`}
                className="w-12 h-14 rounded-lg flex items-center justify-center shadow-lg animate-wave"
                style={{
                  backgroundColor: '#FFB3C6',
                  color: 'white',
                  animationDelay: `${(i + 5) * 0.1}s`,
                  fontFamily: 'Caveat, cursive',
                  fontSize: '1.5rem',
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        <h1
          className="text-5xl mb-4 animate-pulse"
          style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}
        >
          Dwi Suryani Mulato
        </h1>

        <div className="flex justify-center gap-2">
          <Heart className="w-8 h-8 text-pink-400 animate-pulse" fill="currentColor" />
          <Heart className="w-8 h-8 text-pink-300 animate-pulse" fill="currentColor" style={{ animationDelay: '0.2s' }} />
          <Heart className="w-8 h-8 text-pink-400 animate-pulse" fill="currentColor" style={{ animationDelay: '0.4s' }} />
        </div>

        {showScrollHint && (
          <div className="mt-12 animate-fade-in flex justify-center">
            <button
              onClick={onScrollToCandle}
              className="flex flex-col items-center gap-2 animate-bounce opacity-80 hover:opacity-100 hover:scale-110 transition-all"
            >
              <p className="text-sm" style={{ color: '#9D7A88' }}>Klik untuk lanjut</p>
              <ChevronDown className="w-6 h-6" style={{ color: '#F7A4BA' }} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(15deg);
          }
        }
        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes wave {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        .animate-wave {
          animation: wave ease-in-out infinite;
          animation-duration: 2s;
        }
        .animate-bounce-slow {
          animation: bounce-slow ease-in-out infinite;
          animation-duration: 3s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
