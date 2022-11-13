'use client';

import React, { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';
import { Message } from '../typings';
import fetchMessages from '../utils/fetchMessages';

type Props = {};

const ChatInput = (props: Props) => {
  const [inputValue, setInputValue] = useState('');
  const {
    data: messages = [],
    error,
    mutate,
  } = useSWR('messages', fetchMessages);

  // console.log('fetched data: ', messages);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageToSend = inputValue;
    setInputValue('');

    const id = uuid();
    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Artur',
      profilePic:
        'https://scontent.frix1-1.fna.fbcdn.net/v/t39.30808-1/254351141_4807033485986891_4631954783949453800_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=yaznaxQ5QtgAX_WQonR&tn=VxK6rLqZd_324o5h&_nc_ht=scontent.frix1-1.fna&oh=00_AfAxnLyxzOx_h-JQzvzezhJ2C397jR572vK4ov4vIQG67w&oe=63740BA6',
      email: 'alangenfeld@gmail.com',
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
