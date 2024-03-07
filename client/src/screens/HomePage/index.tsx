'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Section from '@/components/ui/Section';
import { IUserInitialState } from '@/store/auth/initialState';
import { useAuth, useElements } from '@/utils/hooks';

import Chat from './Chat';
import ChatForm from './ChatForm';
import ChatUsers from './ChatUsers';
import s from './index.module.scss';

export interface IMsg {
  id: string;
  createdAt: string;
  owner: string;
  partner: string | null;
  message: string;
}

const HomePage = () => {
  const router = useRouter();
  const { user, isAuth } = useAuth();
  const { msgHistory } = useElements();
  const [initialMsg, setInitialMsg] = useState<IMsg | null>(null);
  const [msgArr, setMsgArr] = useState<IMsg[]>([]);
  const [partner, setPartner] = useState<IUserInitialState>(user);

  useEffect(() => {
    isAuth ? router.push('/') : router.push('/signin');
  }, [isAuth, router]);

  const filterMsgs = (partner: IUserInitialState) => {
    const filtredMsgs = [...msgHistory, ...msgArr].filter(el => {
      return (
        (partner.email === el.partner && user.email === el.owner) ||
        (partner.email === el.owner && user.email === el.partner)
      );
    });
    return filtredMsgs;
  };

  if (isAuth)
    return (
      <div className={classNames('container', s.home)}>
        <Section>
          <ChatForm
            setMsgArr={setMsgArr}
            partner={partner}
            initialMsg={initialMsg}
            setInitialMsg={setInitialMsg}
          />
          <ChatUsers
            filterMsgs={filterMsgs}
            setPartner={setPartner}
            partner={partner}
          />
        </Section>

        <Section>
          <Chat
            filterMsgs={filterMsgs}
            partner={partner}
            setInitialMsg={setInitialMsg}
          />
        </Section>
      </div>
    );
};

export default HomePage;
