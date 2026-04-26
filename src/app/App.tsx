import { useState } from 'react';
import { PasswordPage } from './components/PasswordPage';
import { MainLandingPage } from './components/MainLandingPage';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handlePasswordSuccess = () => {
    setIsUnlocked(true);
  };

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      {!isUnlocked ? (
        <PasswordPage onSuccess={handlePasswordSuccess} />
      ) : (
        <MainLandingPage />
      )}
    </div>
  );
}
