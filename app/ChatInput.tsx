'use client';

import { unstable_getServerSession } from 'next-auth';
import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';

import { Message } from '../typings';
import fetchMessages from '../utils/fetchMessages';

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>;
};

const ChatInput = ({ session }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const {
    data: messages = [],
    error,
    mutate,
  } = useSWR('messages', fetchMessages);

  // console.log('fetched data: ', messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue || !session) return;

    const messageToSend = inputValue;
    setInputValue('');

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name || '',
      profilePic: session?.user?.image || '',
      email: session?.user?.email || '',
    };

    const sendToUpstash = async () => {
      const response = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const parsedReponse = await response.json();

      return [parsedReponse.message, ...messages];
    };

    // sendToUpstash();
    await mutate(sendToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      className="flex w-full px-10 py-5 space-x-2 border-t border-gray-100 bg-white fixed bottom-0 z-50"
      onSubmit={addMessage}
    >
      <input
        disabled={!session}
        type="text"
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        disabled={!inputValue}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
