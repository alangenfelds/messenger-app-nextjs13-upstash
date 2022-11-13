import Image from 'next/image';
import React from 'react';
import { Message } from '../typings';

type Props = {
  message: Message;
};

const MessageItem = ({ message }: Props) => {
  const isSender = true;

  return (
    <div className={`flex w-fit ${isSender && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isSender && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          src={message.profilePic}
          height={10}
          width={50}
          alt="Profile picture"
        />
      </div>

      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isSender ? 'text-blue-400 text-right' : 'text-red-400 text-left'
          }`}
        >
          {message.username}
        </p>

        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white  ${
              isSender ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'
            }`}
          >
            <p>{message.message}</p>
          </div>

          <p
            className={`italic text-[0.65rem] px-2 text-gray-300 ${
              isSender ? 'text-right' : ''
            }`}
          >
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
