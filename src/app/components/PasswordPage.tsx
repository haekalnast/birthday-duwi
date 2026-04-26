import { useState, useEffect } from 'react';
import { Heart, Eye, EyeOff, Calendar } from 'lucide-react';

interface PasswordPageProps {
  onSuccess: () => void;
}

export function PasswordPage({ onSuccess }: PasswordPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  const userPassword = '20051996'; // Duwi's password - only works on birthday
  const adminPassword = 'mrbean'; // Admin password - works anytime

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();

      // Birthday: May 20
      let birthday = new Date(currentYear, 4, 20, 0, 0, 0); // Month is 0-indexed (4 = May)

      // If birthday has passed this year, count to next year
      if (now > birthday) {
        birthday = new Date(currentYear + 1, 4, 20, 0, 0, 0);
      }

      const diff = birthday.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      setDaysLeft(days);
    };

    calculateDaysLeft();
    const timer = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  const isBirthday = () => {
    const now = new Date();
    const month = now.getMonth(); // 0-indexed
    const day = now.getDate();

    // Check if today is May 20 (month 4, day 20)
    return month === 4 && day === 20;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Admin password - always works
    if (password === adminPassword) {
      onSuccess();
      return;
    }

    // User password - only works on birthday
    if (password === userPassword) {
      if (isBirthday()) {
        onSuccess();
      } else {
        setError(true);
        setErrorMessage('Belum waktunya buka kejutan, sayang! Tunggu tanggal 20 Mei ya 💕');
        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 4000);
      }
      return;
    }

    // Wrong password
    setError(true);
    setErrorMessage('Password salah, coba lagi ya! 💕');
    setTimeout(() => {
      setError(false);
      setErrorMessage('');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-300 opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-pink-200">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <Heart className="w-16 h-16 text-pink-400 animate-pulse" fill="currentColor" />
            </div>
            <h1 className="text-3xl mb-2" style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}>
              Special Access for Duwi
            </h1>
            <p className="text-sm mb-4" style={{ color: '#9D7A88' }}>
              Masukkan password untuk membuka kejutan
            </p>

            {/* Countdown */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border-2 border-pink-200 mb-4">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Calendar className="w-4 h-4" style={{ color: '#F7A4BA' }} />
                <p className="text-xs" style={{ color: '#9D7A88' }}>
                  Countdown Ulang Tahun
                </p>
              </div>
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="bg-white rounded-lg px-8 py-3 shadow-sm">
                    <p className="text-4xl mb-1" style={{ fontFamily: 'Caveat, cursive', color: '#F7A4BA' }}>
                      {daysLeft}
                    </p>
                    <p className="text-xs" style={{ color: '#9D7A88' }}>Hari Lagi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  className={`w-full px-6 py-4 pr-14 rounded-2xl border-2 transition-all outline-none ${
                    error
                      ? 'border-red-300 bg-red-50'
                      : 'border-pink-200 bg-pink-50/50 focus:border-pink-400 focus:bg-white'
                  }`}
                  style={{ color: '#5D3A4A' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-pink-100 rounded-full transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" style={{ color: '#9D7A88' }} />
                  ) : (
                    <Eye className="w-5 h-5" style={{ color: '#9D7A88' }} />
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500 text-center leading-relaxed">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-2xl active:scale-95 shadow-lg"
              style={{ backgroundColor: '#F7A4BA', color: '#5D3A4A' }}
            >
              <span className="flex items-center justify-center gap-2">
                Buka Kejutan
                <Heart className="w-5 h-5" fill="currentColor" />
              </span>
            </button>
          </form>

          <p className="text-xs text-center mt-6" style={{ color: '#9D7A88' }}>
            Hint: Tanggal lahir kamu (DDMMYYYY) 💖
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}
