import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { secureRandom } from '../lib/random';
import type { PrizeSetting, PrizePool } from '../types';

const DEFAULT_TITLE = '抽奖活动';
const DEFAULT_TOTAL_PEOPLE = 10;

export function useLottery() {
  const [title, setTitle] = useLocalStorage<string>('lotteryTitle', DEFAULT_TITLE);
  const [totalPeople, setTotalPeople] = useLocalStorage<number>('totalPeople', DEFAULT_TOTAL_PEOPLE);
  const [prizeSettings, setPrizeSettings] = useLocalStorage<PrizeSetting[]>('prizeSettings', []);
  const [prizePool, setPrizePool] = useLocalStorage<PrizePool>('prizePool', []);
  const [customizationEnabled, setCustomizationEnabled] = useLocalStorage<boolean>('customizationEnabled', true);
  const [organizerLogo, setOrganizerLogo] = useLocalStorage<string | null>('organizerLogo', null);
  const [filmLogo, setFilmLogo] = useLocalStorage<string | null>('filmLogo', null);

  const initializePrizePool = useCallback((settings?: PrizeSetting[], total?: number) => {
    const currentSettings = settings ?? prizeSettings;
    const currentTotal = total ?? totalPeople;

    const pool: PrizePool = [];
    for (const prize of currentSettings) {
      for (let i = 0; i < prize.count; i++) {
        pool.push(prize.name);
      }
    }

    const noPrizeCount = currentTotal - pool.length;
    for (let i = 0; i < noPrizeCount; i++) {
      pool.push('未中奖');
    }

    setPrizePool(pool);
    return pool;
  }, [prizeSettings, totalPeople, setPrizePool]);

  const saveConfig = useCallback((newTitle: string, newTotalPeople: number, newSettings: PrizeSetting[]) => {
    setTitle(newTitle);

    const totalPrizes = newSettings.reduce((sum, p) => sum + p.count, 0);
    const finalTotal = Math.max(newTotalPeople, totalPrizes);
    setTotalPeople(finalTotal);
    setPrizeSettings(newSettings);
    initializePrizePool(newSettings, finalTotal);
  }, [setTitle, setTotalPeople, setPrizeSettings, initializePrizePool]);

  const resetPool = useCallback(() => {
    localStorage.removeItem('totalPeople');
    localStorage.removeItem('prizePool');
    localStorage.removeItem('prizeSettings');
    setTotalPeople(DEFAULT_TOTAL_PEOPLE);
    setPrizeSettings([]);
    setPrizePool([]);
  }, [setTotalPeople, setPrizeSettings, setPrizePool]);

  const draw = useCallback((): { prize: string; isWin: boolean } | null => {
    if (prizePool.length === 0) return null;

    const randomIndex = secureRandom(prizePool.length);
    const drawnPrize = prizePool[randomIndex];

    const newPool = [...prizePool];
    newPool.splice(randomIndex, 1);
    setPrizePool(newPool);

    return {
      prize: drawnPrize,
      isWin: drawnPrize !== '未中奖',
    };
  }, [prizePool, setPrizePool]);

  const toggleCustomization = useCallback(() => {
    setCustomizationEnabled(prev => !prev);
  }, [setCustomizationEnabled]);

  return {
    title,
    totalPeople,
    prizeSettings,
    prizePool,
    customizationEnabled,
    organizerLogo,
    filmLogo,
    saveConfig,
    resetPool,
    draw,
    toggleCustomization,
    setOrganizerLogo,
    setFilmLogo,
  };
}
