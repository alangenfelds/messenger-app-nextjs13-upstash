import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
  message: Message;
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method now allowed.' });
    return;
  }

  const { message } = req.body;

  // replacing message object with server's timestamp
  const preparedMessage = {
    ...message,
    created_at: Date.now(),
  };

  // pushing hashset to redis (upstash)
  await redis.hset('messages', message.id, JSON.stringify(preparedMessage));

  res.status(200).json({ message: preparedMessage });
}
