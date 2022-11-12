import React from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

type Props = {};

const s = (props: Props) => {
  return (
    <main>
      <MessageList />
      <ChatInput />
    </main>
  );
};

export default s;
