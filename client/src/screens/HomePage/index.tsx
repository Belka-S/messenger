'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Section from '@/components/ui/Section';
import { socket } from '@/servises/apiWs';
import { IUserInitialState } from '@/store/auth/initialState';
import { fetchElements } from '@/store/elements/elementSlice';
import { useAppDispatch } from '@/store/hooks';
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
  fileUrl: string | null;
  filePath: string | null;
}

const HomePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAuth();
  const { elements } = useElements();
  const [partner, setPartner] = useState<IUserInitialState>(user);
  const [updatedMsg, setUpdatedMsg] = useState<IMsg | null>(null);

  useEffect(() => {
    isAuth ? router.push('/') : router.push('/signin');
  }, [isAuth, router]);

  useEffect(() => {
    socket.on('addMessage', async msg => {
      // await dispatch(fetchElementsThunk()).unwrap().catch(err => toast.error(err.message));
      socket.emit('fetchMessages', 'all', (resp: any) => {
        resp.docs && dispatch(fetchElements(resp.docs));
      });
    });
  }, [dispatch, elements]);

  useEffect(() => {
    socket.on('updateMessage', async msg => {
      console.log('msg: ', msg);
      // await dispatch(fetchElementsThunk()).unwrap().catch(err => toast.error(err.message));
      socket.emit('fetchMessages', 'all', (resp: any) => {
        console.log('resp: ', resp);
        resp.docs && dispatch(fetchElements(resp.docs));
      });
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('deleteMessage', async msg => {
      // await dispatch(fetchElementsThunk()).unwrap().catch(err => toast.error(err.message));
      socket.emit('fetchMessages', 'all', (resp: any) => {
        resp.docs && dispatch(fetchElements(resp.docs));
      });
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('uploadFile', async msg => {
      // await dispatch(fetchElementsThunk()).unwrap().catch(err => toast.error(err.message));
      socket.emit('fetchMessages', 'all', (resp: any) => {
        resp.docs && dispatch(fetchElements(resp.docs));
      });
    });
  }, [dispatch]);

  const filterMsgs = (partner: IUserInitialState) => {
    const filtredMsgs = elements.filter((el: IMsg) => {
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
        <Section className={s.sidebar}>
          <ChatForm
            partner={partner}
            updatedMsg={updatedMsg}
            setUpdatedMsg={setUpdatedMsg}
          />
          <ChatUsers
            partner={partner}
            setPartner={setPartner}
            filterMsgs={filterMsgs}
          />
        </Section>

        <span></span>

        <Section>
          <Chat
            partner={partner}
            filterMsgs={filterMsgs}
            setUpdatedMsg={setUpdatedMsg}
          />
        </Section>
      </div>
    );
};

export default HomePage;
