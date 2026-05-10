export interface PrizeSetting {
  name: string;
  count: number;
}

export interface LotteryConfig {
  title: string;
  totalPeople: number;
  prizeSettings: PrizeSetting[];
}

export type PrizePool = string[];
