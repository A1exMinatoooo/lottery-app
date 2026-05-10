import { useState, useCallback } from 'react';
import { useLottery } from '../hooks/useLottery';
import { DrawButton } from './DrawButton';
import { LoadingOverlay } from './LoadingOverlay';
import { StatusBar } from './StatusBar';
import { ResultPopup } from './ResultPopup';
import { SettingsPanel } from './SettingsPanel';
import { SecretEasterEgg } from './SecretEasterEgg';
import type { PrizeSetting } from '../types';

export function LotteryApp() {
  const {
    title,
    totalPeople,
    prizeSettings,
    prizePool,
    customizationEnabled,
    saveConfig,
    resetPool,
    draw,
    toggleCustomization,
  } = useLottery();

  const [showSettings, setShowSettings] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{ prize: string; isWin: boolean } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = useCallback(() => {
    if (prizePool.length === 0) {
      setResult({ prize: '所有奖品已抽完！', isWin: false });
      setShowResult(true);
      return;
    }

    setIsDrawing(true);
    setShowLoading(true);

    const delay = Math.random() * 1000 + 500;

    setTimeout(() => {
      const drawResult = draw();
      setShowLoading(false);
      setIsDrawing(false);

      if (drawResult) {
        setResult(drawResult);
        setShowResult(true);
      }
    }, delay);
  }, [prizePool.length, draw]);

  const handleCloseResult = useCallback(() => {
    setShowResult(false);
    setResult(null);
  }, []);

  const handleSaveConfig = useCallback((newTitle: string, newTotalPeople: number, settings: PrizeSetting[]) => {
    saveConfig(newTitle, newTotalPeople, settings);
  }, [saveConfig]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 flex items-center justify-center p-4">
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 pb-6 w-full max-w-lg">
        <SecretEasterEgg
          customizationEnabled={customizationEnabled}
          onToggle={toggleCustomization}
        />

        <h1 className="text-3xl font-bold text-rose-800 mb-8 text-center">
          {title}
        </h1>

        <div className="space-y-6">
          <DrawButton onClick={handleDraw} disabled={isDrawing} />
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="fixed top-6 right-6 px-6 py-3 bg-amber-500 hover:bg-amber-600
            text-white font-semibold rounded-full shadow-lg
            transition-all duration-200 hover:shadow-xl z-30"
        >
          奖品设置
        </button>

        <StatusBar remaining={prizePool.length} total={totalPeople} />
      </div>

      {result && (
        <ResultPopup
          show={showResult}
          isWin={result.isWin}
          prize={result.prize}
          customizationEnabled={customizationEnabled}
          onClose={handleCloseResult}
        />
      )}

      <SettingsPanel
        show={showSettings}
        title={title}
        totalPeople={totalPeople}
        prizeSettings={prizeSettings}
        prizePool={prizePool}
        onClose={() => setShowSettings(false)}
        onSave={handleSaveConfig}
        onReset={resetPool}
      />

      <LoadingOverlay show={showLoading} customizationEnabled={customizationEnabled} />
    </div>
  );
}
