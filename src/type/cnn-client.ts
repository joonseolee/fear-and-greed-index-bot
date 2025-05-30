export type FearAndGreedStaticsResponse = {
  fear_and_greed: {
    score: number;
    rating: string;
    timestamp: string;
    previous_close: number;
    previous_1_week: number;
    previous_1_month: number;
    previous_1_year: number;
  };
  fear_and_greed_historical: unknown;
};

export type FearAndGreedStatics = {
  score: number;
  rating: string;
  createdAt: string;
  previousOneDayScore: number;
  previousOneWeekScore: number;
  previousOneMonthScore: number;
  previousOneYearScore: number;
};
