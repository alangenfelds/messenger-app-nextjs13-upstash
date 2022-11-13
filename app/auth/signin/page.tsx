import React from 'react';
import { getProviders } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from './SignInComponent';

type Props = {};

const SignInPage = async (props: Props) => {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="mt-10 ml-11 rounded-full mx-2 object-contain"
          src="https://links.papareact.com/jne"
          height={56}
          width={100}
          alt="Profile picture"
        />
      </div>

      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
