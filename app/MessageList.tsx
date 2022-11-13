'use client';

import React, { useEffect } from 'react';
import useSWR from 'swr';
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import fetchMessages from '../utils/fetchMessages';
import MessageItem from './MessageItem';

type Props = {
  initialMessages: Message[];
};

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>('messages', fetchMessages);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages-channel');
    channel.bind('new-message-event', async (data: Message) => {
      // Option 1. Just do refecth of messages
      // mutate(fetchMessages);

      // Option 2. Optimistic update
      if (messages?.find((message) => message.id === data.id)) {
        return;
      }

      if (!messages) {
        mutate(fetchMessages);
      } else {
        mutate(fetchMessages, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {(messages || initialMessages).map((message) => (
        <MessageItem key={message.id + Date.now()} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
