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
}

const Chat: FC<IChatProps> = ({ msgArr }) => {
  // const dispatch = useAppDispatch();
  // const { allUsers } = useAuth();

  // useEffect(() => {
  //   dispatch(getAllUsersThunk());
  // }, [dispatch]);

  return (
    <>
      <H4>Chat</H4>
      <ul>
        {msgArr.map((el: IMsg) => (
          <li key={el.ms}>
            {el.date} - {el.message} - {el.owner}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Chat;
