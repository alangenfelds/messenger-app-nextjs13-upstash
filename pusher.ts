import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

// Enable pusher logging - don't include this in production
// ClientPusher.logToConsole = true;

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_CLIENT_KEY!,
  {
    cluster: 'eu',
    forceTLS: true,
  }
);

export const serverPusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_SERVER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_SERVER_KEY!,
  secret: process.env.NEXT_PUBLIC_PUSHER_SERVER_SECRET!,
  cluster: 'eu',
  useTLS: true,
});
