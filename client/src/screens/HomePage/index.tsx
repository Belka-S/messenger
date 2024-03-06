'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Section from '@/components/ui/Section';
import { IUserInitialState } from '@/store/auth/initialState';
import { useAuth } from '@/utils/hooks';

import Chat from './Chat';
import ChatForm from './ChatForm';
import ChatUsers from './ChatUsers';
import s from './index.module.scss';

export interface IMsg {
  ms: string;
  date: string;
  owner: string;
  partner: string | null;
  message: string;
}

const HomePage = () => {
  const router = useRouter();
  const { user, isAuth } = useAuth();
  const [msgArr, setMsgArr] = useState<IMsg[]>([]);
  const [partner, setPartner] = useState<IUserInitialState>(user);

  useEffect(() => {
    isAuth ? router.push('/') : router.push('/signin');
  }, [isAuth, router]);

  if (isAuth)
    return (
      <div className={classNames('container', s.home)}>
        <Section>
          <ChatForm setMsgArr={setMsgArr} partner={partner} />
          <ChatUsers setPartner={setPartner} />
        </Section>

        <Section>
          <Chat msgArr={msgArr} partner={partner} />
        </Section>
      </div>
    );
};

export default HomePage;
