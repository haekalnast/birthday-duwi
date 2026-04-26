import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { HeroSection } from './HeroSection';
import { CandleSection } from './CandleSection';
import { WishesSection } from './WishesSection';
import { GachaSection } from './GachaSection';

export function MainLandingPage() {
  const [unlockedSections, setUnlockedSections] = useState({
    hero: true,
    candle: false,
    wishes: false,
    gacha: false,
  });
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const candleSectionRef = useRef<HTMLDivElement>(null);
  const wishesSectionRef = useRef<HTMLDivElement>(null);
  const gachaSectionRef = useRef<HTMLDivElement>(null);

  // Auto play music on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Disable scroll until sections are unlocked
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Block scroll to candle section if not unlocked
      if (scrollingDown && scrollPosition < windowHeight && !unlockedSections.candle) {
        e.preventDefault();
      }
      // Block scroll to wishes section if not unlocked
      else if (scrollingDown && scrollPosition >= windowHeight && scrollPosition < windowHeight * 2 && !unlockedSections.wishes) {
        e.preventDefault();
      }
      // Block scroll to gacha section if not unlocked
      else if (scrollingDown && scrollPosition >= windowHeight * 2 && scrollPosition < windowHeight * 3 && !unlockedSections.gacha) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition < windowHeight && !unlockedSections.candle) {
        e.preventDefault();
      } else if (scrollPosition >= windowHeight && scrollPosition < windowHeight * 2 && !unlockedSections.wishes) {
        e.preventDefault();
      } else if (scrollPosition >= windowHeight * 2 && scrollPosition < windowHeight * 3 && !unlockedSections.gacha) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [unlockedSections]);

  const handleScrollToCandle = () => {
    setUnlockedSections(prev => ({ ...prev, candle: true }));
    setTimeout(() => {
      candleSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    setUnlockedSections(prev => ({ ...prev, wishes: true }));
    setTimeout(() => {
      wishesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const handleContinueToGacha = () => {
    setUnlockedSections(prev => ({ ...prev, gacha: true }));
    setTimeout(() => {
      gachaSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full relative">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#F7A4BA' }}
        aria-label={isMuted ? 'Play music' : 'Pause music'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" style={{ color: '#5D3A4A' }} />
        ) : (
          <Volume2 className="w-6 h-6 animate-pulse" style={{ color: '#5D3A4A' }} />
        )}
      </button>

      <HeroSection onScrollToCandle={handleScrollToCandle} />
      <div ref={candleSectionRef}>
        <CandleSection onBlow={handleBlowCandles} candlesBlown={candlesBlown} />
      </div>
      <div ref={wishesSectionRef}>
        <WishesSection onContinue={handleContinueToGacha} />
      </div>
      <div ref={gachaSectionRef}>
        <GachaSection />
      </div>
    </div>
  );
}
