'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Section from '@/components/ui/Section';
import { useAuth } from '@/utils/hooks';

import Chat from './Chat';
import ChatForm from './ChatForm';
import ChatUsers from './ChatUsers';
import s from './index.module.scss';

export interface IMsg {
  ms: string;
  date: string;
  owner: string;
  message: string;
}

const HomePage = () => {
  const router = useRouter();
  const { isAuth } = useAuth();
  const [msgArr, setMsgArr] = useState<IMsg[]>([]);

  useEffect(() => {
    isAuth ? router.push('/') : router.push('/signin');
  }, [isAuth, router]);

  if (isAuth)
    return (
      <div className={classNames('container', s.home)}>
        <Section>
          <ChatForm setMsgArr={setMsgArr} />
          <ChatUsers />
        </Section>

        <Section>
          <Chat msgArr={msgArr} />
        </Section>
      </div>
    );
};

export default HomePage;
