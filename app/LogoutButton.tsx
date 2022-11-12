'use client';

import React from 'react';

type Props = {};

const LogoutButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        console.log('Logout');
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign Out
    </button>
  );
};

export default LogoutButton;
