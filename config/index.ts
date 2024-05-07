import * as dotenv from 'dotenv';
dotenv.config();

export const config: any = {
  bot_token: process.env.BOT_TOKEN,
  group_id: process.env.GROUP_ID
};
