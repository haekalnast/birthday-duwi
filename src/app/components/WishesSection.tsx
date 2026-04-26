import { Heart, Gift, Sparkles } from 'lucide-react';

interface WishesSectionProps {
  onContinue: () => void;
}

export function WishesSection({ onContinue }: WishesSectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
        {[...Array(10)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-pink-200 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${25 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
          <div className="text-center mb-6">
            <div className="inline-block mb-4 animate-bounce">
              <Heart className="w-16 h-16 text-pink-400" fill="currentColor" />
            </div>
            <h2
              className="text-4xl mb-4"
              style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}
            >
              Happy Birthday, Sayang! 💕
            </h2>
          </div>

          <div className="space-y-4 mb-6" style={{ color: '#5D3A4A' }}>
            <p className="leading-relaxed text-center text-sm">
              Selamat ulang tahun untuk wanita paling cantik dan paling spesial dalam hidupku! ✨
            </p>

            <div className="bg-pink-50/50 rounded-2xl p-3 border-2 border-pink-100">
              <p className="leading-relaxed text-xs">
                Di hari istimewa ini, aku berharap semua impian kamu bisa terwujud. Semoga kamu selalu dikelilingi kebahagiaan dan cinta yang berlimpah. ❤️
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-3 border-2 border-pink-100">
              <p className="leading-relaxed text-xs text-center italic">
                "Kamu adalah alasan senyumku setiap hari. I love you more than words can say!" 💖
              </p>
            </div>

            <p className="leading-relaxed text-center text-sm">
              Selamat ulang tahun, my love! Semoga tahun ini membawa lebih banyak kebahagiaan untuk kita berdua. 🎉
            </p>
          </div>

          <button
            onClick={onContinue}
            className="w-full py-4 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            style={{ backgroundColor: '#F7A4BA', color: '#5D3A4A' }}
          >
            <Gift className="w-6 h-6" />
            <span>Lihat Hadiah Spesial</span>
            <Sparkles className="w-6 h-6" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(10deg);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
