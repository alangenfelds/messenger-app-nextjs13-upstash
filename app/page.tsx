import { unstable_getServerSession } from 'next-auth';
import React from 'react';

import { Message } from '../typings';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

type Props = {};

const HomePage = async (props: Props) => {
  // getting data for SSR
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  );

  const messages: Message[] = data.messages;
  const session = await unstable_getServerSession();

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput session={session} />
    </main>
  );
};

export default HomePage;
