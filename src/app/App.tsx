import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { PasswordPage } from './components/PasswordPage';
import { MainLandingPage } from './components/MainLandingPage';
import birthdaySong from '../assets/audio/Birthday Song.mp3';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInitializedAudioRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (!isMuted) {
        audioRef.current.play().catch((error) => {
          console.log('Auto-play blocked:', error);
        });
      }
    }
  }, [isMuted]);

  useEffect(() => {
    const initializeAudioOnFirstInteraction = () => {
      if (hasInitializedAudioRef.current || isMuted) return;

      hasInitializedAudioRef.current = true;
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Interaction play blocked:', error);
        });
      }
    };

    window.addEventListener('pointerdown', initializeAudioOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', initializeAudioOnFirstInteraction, { once: true });
    window.addEventListener('keydown', initializeAudioOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', initializeAudioOnFirstInteraction);
      window.removeEventListener('touchstart', initializeAudioOnFirstInteraction);
      window.removeEventListener('keydown', initializeAudioOnFirstInteraction);
    };
  }, [isMuted]);

  const playAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.play().catch((error) => {
      console.log('Audio play blocked:', error);
    });
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        playAudio();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  const handlePasswordSuccess = () => {
    setIsUnlocked(true);
    if (!isMuted) {
      playAudio();
    }
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <audio ref={audioRef} src={birthdaySong} loop preload="auto" playsInline autoPlay />

      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#F7A4BA' }}
        aria-label={isMuted ? 'Play birthday song' : 'Pause birthday song'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" style={{ color: '#5D3A4A' }} />
        ) : (
          <Volume2 className="w-6 h-6 animate-pulse" style={{ color: '#5D3A4A' }} />
        )}
      </button>

      {!isUnlocked ? (
        <PasswordPage onSuccess={handlePasswordSuccess} />
      ) : (
        <MainLandingPage />
      )}
    </div>
  );
}
