import fetch from "node-fetch";
import {
  FearAndGreedStatics,
  FearAndGreedStaticsResponse,
} from "../type/cnn-client";

export class CNNClient {
  constructor() {}

  public async getFearAndGreedIndex(): Promise<FearAndGreedStatics> {
    let response;
    try {
      response = await fetch(
        "https://production.dataviz.cnn.io/index/fearandgreed/graphdata",
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            Referer: "https://edition.cnn.com/",
            Origin: "https://edition.cnn.com",
          },
        }
      );
    } catch (error) {
      throw new Error(
        `it has been occuring an error through the CNN api - ${error}`
      );
    }

    const data = (await response.json()) as FearAndGreedStaticsResponse;
    return {
      score: data.fear_and_greed.score,
      rating: data.fear_and_greed.rating,
      createdAt: data.fear_and_greed.timestamp,
      previousOneDayScore: data.fear_and_greed.previous_close,
      previousOneWeekScore: data.fear_and_greed.previous_1_week,
      previousOneMonthScore: data.fear_and_greed.previous_1_month,
      previousOneYearScore: data.fear_and_greed.previous_1_year,
    };
  }
}
