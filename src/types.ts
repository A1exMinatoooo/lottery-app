export interface PrizeSetting {
  name: string;
  count: number;
}

export interface LotteryConfig {
  title: string;
  totalPeople: number;
  prizeSettings: PrizeSetting[];
  organizerLogo?: string;
  filmLogo?: string;
}

export type PrizePool = string[];
