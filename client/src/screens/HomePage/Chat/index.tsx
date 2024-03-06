'use client';

import { FC, useEffect } from 'react';

import H4 from '@/components/ui/Typography/H4';
import { getAllUsersThunk } from '@/store/auth/authThunks';
import { IUserInitialState } from '@/store/auth/initialState';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import { IMsg } from '..';
import s from './index.module.scss';

interface IChatProps {
  msgArr: IMsg[];
  partner: IUserInitialState;
}

const Chat: FC<IChatProps> = ({ msgArr, partner }) => {
  // const dispatch = useAppDispatch();
  const { user } = useAuth();

  // useEffect(() => {
  //   dispatch(getAllUsersThunk());
  // }, [dispatch]);

  const filterMsgs = () => {
    const filtredMsgs = msgArr.filter(el => {
      return (
        (partner.email === el.partner && user.email === el.owner) ||
        (partner.email === el.owner && user.email === el.partner)
      );
    });
    return filtredMsgs;
  };

  return (
    <ul>
      {filterMsgs().map((el: IMsg) => (
        <li key={el.ms}>
          {el.date} - {el.message}
          {el.owner !== user.email && ` - ${el.owner}`}
        </li>
      ))}
    </ul>
  );
};

export default Chat;
