import { useState, useRef, useCallback } from 'react';

interface SecretEasterEggProps {
  customizationEnabled: boolean;
  onToggle: () => void;
}

export function SecretEasterEgg({ customizationEnabled, onToggle }: SecretEasterEggProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    clickCountRef.current++;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);

    if (clickCountRef.current === 5) {
      clickCountRef.current = 0;
      onToggle();
      setMessage(customizationEnabled ? 'Customization disabled.' : 'Customization enabled.');
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  }, [customizationEnabled, onToggle]);

  return (
    <>
      <div
        className="absolute top-0 left-0 w-12 h-12 z-10 cursor-default"
        onClick={handleClick}
      />
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-black/80 text-white px-6 py-3 rounded-xl z-[2000]
          animate-[fadeIn_0.3s_ease-in-out]">
          {message}
        </div>
      )}
    </>
  );
}
