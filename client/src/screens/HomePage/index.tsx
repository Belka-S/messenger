'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Section from '@/components/ui/Section';
import { socket } from '@/servises/apiSocket.io';
import { IUserInitialState } from '@/store/auth/initialState';
import { addElement, updateElement } from '@/store/elements/elementSlice';
import { fetchElementsThunk } from '@/store/elements/elementThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth, useElements } from '@/utils/hooks';

import Chat from './Chat';
import ChatForm from './ChatForm';
import ChatUsers from './ChatUsers';
import s from './index.module.scss';

console.log(process.env.NEXT_PUBLIC_PROD_BACK_URL);
console.log(process.env.NEXT_PUBLIC_PROD_BACK_WS);

export interface IMsg {
  id: string;
  createdAt: string;
  owner: string;
  partner: string | null;
  message: string;
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
    dispatch(fetchElementsThunk());
  }, [dispatch]);

  useEffect(() => {
    socket.on('chatMessage', async msg => {
      if (elements.length === 0) {
        await dispatch(fetchElementsThunk())
          .unwrap()
          .then(pld => console.log(pld))
          .catch(err => toast.error(err.message));
      } else {
        const id = await msg.id;
        const isNewMsg = !elements.some((el: IMsg) => el.id === id);
        if (isNewMsg) {
          dispatch(addElement(msg));
        } else {
          dispatch(updateElement(msg));
        }
      }
    });
  }, [dispatch, elements]);

  useEffect(() => {
    socket.on('deleteMessage', msg => {
      dispatch(fetchElementsThunk())
        .unwrap()
        .then(pld => console.log(pld))
        .catch(err => toast.error(err.message));
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
        <Section>
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
