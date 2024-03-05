import '../styles/styles.scss';

import classNames from 'classnames';
import type { Metadata } from 'next';
import { Raleway, Roboto } from 'next/font/google';
import { ReactNode } from 'react';

import Toast from '@/components/Toast';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header';
import StoreProvider from '@/store/StoreProvider';

export const metadata: Metadata = {
  title: 'NextStarter',
  description: 'Generated by create next app',
};

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--fontRaleway',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  variable: '--fontRoboto',
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={classNames('layout', roboto.variable, raleway.variable)}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>

        <Toast />
      </body>
    </html>
  );
};

export default RootLayout;
