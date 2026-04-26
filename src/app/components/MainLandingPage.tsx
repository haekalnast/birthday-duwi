import { useState, useRef, useEffect } from 'react';
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
  const candleSectionRef = useRef<HTMLDivElement>(null);
  const wishesSectionRef = useRef<HTMLDivElement>(null);
  const gachaSectionRef = useRef<HTMLDivElement>(null);

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
    <div className="w-full relative animate-page-enter">
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

      <style>{`
        @keyframes page-enter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-page-enter {
          animation: page-enter 0.7s ease-out;
        }
      `}</style>
    </div>
  );
}
