import { unstable_getServerSession } from 'next-auth';

import Header from './Header';
import { Providers } from './providers';
import '../styles/globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession();

  return (
    <html>
      <head />
      <Providers session={session}>
        <body>
          <Header />
          {children}
        </body>
      </Providers>
    </html>
  );
}
