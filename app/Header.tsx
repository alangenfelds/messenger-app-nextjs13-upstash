'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LogoutButton from './LogoutButton';
import { useSession } from 'next-auth/react';

type Props = {};

const Header = (props: Props) => {
  // const session = await unstable_getServerSession();
  const { data: session } = useSession();

  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex items-center justify-between p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={session?.user?.image!}
            height={10}
            width={50}
            alt="Profile picture"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session?.user?.name}</p>
          </div>
        </div>

        <LogoutButton />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white flex items-center justify-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5 select-none">
        <div className="flex space-x-2 items-center">
          {/* <Image
            src="/images/meta_logo.webp"
            height={120}
            width={120}
            alt="Meta logo"
          /> */}

          <p className="text-blue-400 text-4xl font-bold">
            Welcome to Meta Messenger
          </p>
        </div>
        {/* <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link> */}
      </div>
    </header>
  );
};

export default Header;
