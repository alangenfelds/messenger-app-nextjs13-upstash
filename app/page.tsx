import { unstable_getServerSession } from 'next-auth';
import React from 'react';

import { Message } from '../typings';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { Providers } from './providers';

type Props = {};

const HomePage = async (props: Props) => {
  // getting data for SSR
  const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(
    (res) => res.json()
  );

  const session = await unstable_getServerSession();

  const messages: Message[] = data.messages;

  return (
    <Providers session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <ChatInput session={session} />
      </main>
    </Providers>
  );
};

export default HomePage;
