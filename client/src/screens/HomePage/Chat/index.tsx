'use client';

import classNames from 'classnames';
import { FC, useEffect } from 'react';

import { IUserInitialState } from '@/store/auth/initialState';
import { fetchElementsThunk } from '@/store/elements/elementThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import { IMsg } from '..';
import s from './index.module.scss';

interface IChatProps {
  filterMsgs: (partner: IUserInitialState) => IMsg[];
  partner: IUserInitialState;
}

const Chat: FC<IChatProps> = ({ filterMsgs, partner }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(fetchElementsThunk());
  }, [dispatch]);

  return (
    <ul>
      <div className={s.chat__title}>
        <span>me</span>
        <span>{partner.name}</span>
      </div>
      {filterMsgs(partner).map((el: IMsg) => {
        const isMyMsg = el.owner === user.email;

        return (
          <li
            className={classNames(s.chat__msg, isMyMsg ? s.left : s.right)}
            key={el.id}
          >
            <div
              className={classNames(
                s.chat__msg_wrap,
                isMyMsg ? s.left : s.right,
              )}
            >
              <p>{el.message}</p>
              <p className={s.date}>{el.createdAt}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Chat;
