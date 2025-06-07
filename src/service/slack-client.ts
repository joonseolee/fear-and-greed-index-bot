import { Block, KnownBlock, WebClient } from "@slack/web-api";
import { FearAndGreedStatics } from "../type/cnn-client";

const token = process.env.SLACK_BOT_TOKEN;
const channel = "#daily-fear-and-greed-index"; // 또는 사용자 ID

export class SlackClient {
  private readonly client: WebClient;

  constructor() {
    this.client = new WebClient(token);
  }

  public async sendMessage(fearAndGreedStatics: FearAndGreedStatics) {
    const opinion =
      fearAndGreedStatics.score >= 50
        ? "돈이나 모아라ㅠ"
        : "이제 살때가 되었다!";
    const blocks = this.getBlocks(fearAndGreedStatics, opinion);

    // 디버깅용: 생성된 블록 구조를 콘솔에 출력
    console.log(JSON.stringify(blocks, null, 2));

    const response = await this.client.chat.postMessage({
      channel,
      blocks,
    });

    if (!response.ok) {
      throw new Error(`Slack API Error: ${response.error}`);
    }

    console.log("✅ Slack 메시지 전송 성공");
  }

  private getBlocks(
    fearAndGreedStatics: FearAndGreedStatics,
    opinion: string
  ): (KnownBlock | Block)[] {
    // 오늘날 기준 몇 포인트 떨어졌고 올랐는지 확인
    const todayChange =
      fearAndGreedStatics.score - fearAndGreedStatics.previousOneDayScore;
    const todayChangeText =
      todayChange > 0
        ? `${fearAndGreedStatics.score} (+${todayChange})`
        : `${fearAndGreedStatics.score} (-${Math.abs(todayChange)})`;

    return [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📊 오늘의 탐욕지수",
          emoji: true,
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*현재 점수:*\n${this.applyEmoji(
              fearAndGreedStatics.score
            )} ${todayChangeText}`,
          },
          {
            type: "mrkdwn",
            text: `*판단:*\n:money_with_wings: *${fearAndGreedStatics.rating}*`,
          },
          {
            type: "mrkdwn",
            text: `*어제:*\n${this.applyEmoji(
              fearAndGreedStatics.previousOneDayScore
            )} ${fearAndGreedStatics.previousOneDayScore}`,
          },
          {
            type: "mrkdwn",
            text: `*일주일 전:*\n${this.applyEmoji(
              fearAndGreedStatics.previousOneWeekScore
            )} ${fearAndGreedStatics.previousOneWeekScore}`,
          },
          {
            type: "mrkdwn",
            text: `*한 달 전:*\n${this.applyEmoji(
              fearAndGreedStatics.previousOneMonthScore
            )} ${fearAndGreedStatics.previousOneMonthScore}`,
          },
          {
            type: "mrkdwn",
            text: `*기준 시각:*\n${fearAndGreedStatics.createdAt}`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `*의견:* ${opinion}`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "*탐욕지수 범위:*\n`0-25`: 😱 매우 공포\n`25-45`: 😰 공포\n`45-55`: 😐 중립\n`55-75`: 🤑 탐욕\n`75-100`: 🔥 매우 탐욕",
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "📈 자세히 보기",
            },
            url: "https://edition.cnn.com/markets/fear-and-greed",
            action_id: "open_fear_and_greed_link",
          },
        ],
      },
    ];
  }

  private applyEmoji(score: number): string {
    if (score >= 75) {
      return "🔥";
    } else if (score >= 55) {
      return "🤑";
    } else if (score >= 45) {
      return "😐";
    } else if (score >= 25) {
      return "😰";
    } else {
      return "😱";
    }
  }
}
