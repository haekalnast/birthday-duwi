import { useMemo, useState } from 'react';
import { Gift, Heart, Sparkles, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

type Gift = { id: string; emoji: string; name: string; description: string };

function shuffleGifts<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 3 hadiah yang pasti didapat (urutan random)
const guaranteedGifts: Gift[] = [
  {
    id: 'bunga',
    emoji: '🤍',
    name: 'Bunga Lily Putih',
    description: 'Buket bunga lily putih / bunga putih yang cantik untukmu',
  },
  {
    id: 'tumbler',
    emoji: '🥤',
    name: 'Hydro Flask Birch 21oz',
    description: 'Hydro Flask Standard Flex Straw Cap Tonal Birch 21 oz',
  },
  {
    id: 'sepatu',
    emoji: '👟',
    name: 'Hijack Flo Silven',
    description: 'Sepatu Hijack Flo Silven spesial untukmu',
  },
];

// Pilihan kreatif saat spin (decoy — tidak akan didapat)
const decoyGifts: Gift[] = [
  { id: 'mahar', emoji: '🥇', name: 'Mahar Antam 10 Gram', description: 'Mahar emas Antam 10 gram untuk hari bahagia kita' },
  { id: 'tiffany', emoji: '💎', name: 'Cincin Tiffany & Co', description: 'Cincin Tiffany & Co. yang berkilau' },
  { id: 'kuliah', emoji: '🎓', name: 'Biaya Kuliah UT', description: 'Biaya kuliah di Universitas Terbuka' },
  { id: 'kua', emoji: '💒', name: 'Nikah di KUA', description: 'Paket nikah resmi di KUA' },
  { id: 'iphone', emoji: '📱', name: 'iPhone 14', description: 'HP iPhone 14 impianmu' },
  { id: 'macbook', emoji: '💻', name: 'MacBook Air M1', description: 'Laptop MacBook Air M1 untuk kuliah & kerja' },
];

export function GachaSection() {
  const displayGifts = useMemo(
    () => shuffleGifts([...guaranteedGifts, ...decoyGifts]),
    []
  );
  const [awardQueue] = useState(() => shuffleGifts(guaranteedGifts));

  const [isSpinning, setIsSpinning] = useState(false);
  const [revealedGifts, setRevealedGifts] = useState<Gift[]>([]);
  const [currentEmoji, setCurrentEmoji] = useState('🎁');
  const [gachaCount, setGachaCount] = useState(0);
  const maxGachaCount = 3;

  const handleGacha = () => {
    if (isSpinning || gachaCount >= maxGachaCount) return;

    setIsSpinning(true);

    // Spinning animation - show all gifts during spin
    let counter = 0;
    const spinInterval = setInterval(() => {
      setCurrentEmoji(displayGifts[Math.floor(Math.random() * displayGifts.length)].emoji);
      counter++;

      if (counter > 20) {
        clearInterval(spinInterval);

        const selectedGift = awardQueue[gachaCount];

        setRevealedGifts(prev => [...prev, selectedGift]);
        setCurrentEmoji(selectedGift.emoji);
        setGachaCount(prev => prev + 1);
        setIsSpinning(false);

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F7A4BA', '#FFB3C6', '#FFD6E0', '#FFF5F7'],
        });

        // Multiple confetti bursts
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#F7A4BA', '#FFB3C6', '#FFD6E0'],
          });
        }, 200);

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#F7A4BA', '#FFB3C6', '#FFD6E0'],
          });
        }, 400);
      }
    }, 100);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        {[...Array(12)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-pink-200 opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${25 + Math.random() * 35}px`,
              animationDelay: `${Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md mx-auto w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 sm:p-8 border-4 border-pink-200">
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center gap-2 mb-4">
              <PartyPopper className="w-8 h-8 text-pink-400 animate-bounce" />
              <Gift className="w-8 h-8 text-pink-500 animate-pulse" />
              <PartyPopper className="w-8 h-8 text-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <h2
              className="text-4xl mb-2"
              style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}
            >
              Hadiah Spesial Untukmu! 🎁
            </h2>
            <p className="text-sm" style={{ color: '#9D7A88' }}>
              Klik tombol di bawah untuk gacha hadiahmu!
            </p>
          </div>

          {/* All available gifts display */}
          <div className="mb-4">
            <p className="text-center text-xs mb-2" style={{ color: '#9D7A88' }}>
              Pilihan Hadiah:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {displayGifts.map((gift) => (
                <div
                  key={gift.id}
                  className={`bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-2 border-2 transition-all ${
                    revealedGifts.some(r => r.id === gift.id)
                      ? 'border-pink-400 shadow-lg scale-105'
                      : 'border-pink-200'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{gift.emoji}</div>
                    <p className="text-[10px] leading-tight" style={{ color: '#5D3A4A' }}>
                      {gift.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {gachaCount < maxGachaCount && (
              <div className="mt-3">
                <button
                  onClick={handleGacha}
                  disabled={isSpinning}
                  className="w-full py-3 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#F7A4BA', color: '#5D3A4A' }}
                >
                  <Gift className="w-5 h-5" />
                  <span>{isSpinning ? 'Mengocok...' : 'Gacha Hadiah!'}</span>
                  <Gift className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Gacha display */}
          <div className="mb-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-6 border-4 border-pink-300 shadow-inner">
                <div className="flex justify-center items-center h-32">
                  <div className={`text-6xl transition-all ${isSpinning ? 'animate-spin-fast' : 'animate-bounce-gentle'}`}>
                    {currentEmoji}
                  </div>
                </div>
              </div>

              {/* Decorative corners */}
              <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-yellow-400" fill="currentColor" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400" fill="currentColor" />
              <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-yellow-400" fill="currentColor" />
              <Sparkles className="absolute -bottom-2 -right-2 w-6 h-6 text-yellow-400" fill="currentColor" />
            </div>
          </div>

          {/* Gacha counter */}
          <div className="mb-4 text-center">
            <p className="text-xs" style={{ color: '#9D7A88' }}>
              Gacha: {gachaCount} / {maxGachaCount}
            </p>
          </div>

          {/* Revealed gifts list */}
          {revealedGifts.length > 0 && (
            <div className="mb-4 space-y-2 animate-fade-in">
              {revealedGifts.map((gift) => (
                <div key={gift.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-3 border-2 border-pink-200">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{gift.emoji}</div>
                    <div className="flex-1 text-left">
                      <h3 className="text-sm mb-0.5" style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}>
                        {gift.name}
                      </h3>
                      <p className="text-[10px]" style={{ color: '#5D3A4A' }}>
                        {gift.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {gachaCount >= maxGachaCount && (
            <div className="mb-4 bg-pink-50 rounded-2xl p-4 text-center border-2 border-pink-100 animate-fade-in">
              <h3 className="text-xl mb-2" style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}>
                Selamat! 🎉
              </h3>
              <p className="text-xs mb-3" style={{ color: '#5D3A4A' }}>
                Kamu sudah mendapatkan {revealedGifts.length} hadiah spesial!
                Aku akan wujudkan semua hadiah ini untukmu, sayang! 💕
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-4 h-4 text-pink-400 animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer message */}
          <div className="mt-4 text-center">
            <p className="text-xs" style={{ color: '#9D7A88' }}>
              Made with 💖 for my beloved Dwi Suryani Mulato
            </p>
          </div>
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
        @keyframes spin-fast {
          from {
            transform: rotate(0deg) scale(1);
          }
          to {
            transform: rotate(360deg) scale(1.1);
          }
        }
        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 0.1s linear infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
