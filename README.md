# Fear and Greed Index Bot

A Slack bot that automatically posts the CNN Fear & Greed Index to a specified Slack channel every day at 9 AM.

## Features

- Fetches daily Fear & Greed Index data from CNN
- Posts formatted messages to Slack with:
  - Current score and rating
  - Historical comparisons (previous day, week, month)
  - Market sentiment analysis
  - Direct link to CNN's Fear & Greed Index page

## Tech Stack

- TypeScript
- Node.js
- Slack Bolt Framework
- node-fetch for API requests

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   SLACK_BOT_TOKEN=your_slack_bot_token
   ```
4. Build and run:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── app.ts             # Main application entry point
├── index.ts           # Application bootstrap
├── command/           # Slack command handlers
├── service/           # Core services
│   ├── cnn-client.ts  # CNN API client
│   └── slack-client.ts # Slack API client
└── type/              # TypeScript type definitions
```

## Development

- Build: `npm run build`
- Start: `npm start`

## License

ISC
