import { CNNClient } from "./service/cnn-client";
import { SlackClient } from "./service/slack-client";

export class App {
  constructor() {}

  public async run() {
    const cnnClient = new CNNClient();
    const slackClient = new SlackClient();

    const cnnResponse = await cnnClient.getFearAndGreedIndex();
    await slackClient.sendMessage(cnnResponse);
  }
}
