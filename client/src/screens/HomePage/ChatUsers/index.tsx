'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import H5 from '@/components/ui/Typography/H5';
import { getAllUsersThunk } from '@/store/auth/authThunks';
import { IUserInitialState } from '@/store/auth/initialState';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';

const ChatUsers = () => {
  const dispatch = useAppDispatch();
  const { user, allUsers } = useAuth();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  return (
    <Section>
      <H5>Choose someone to chat with:</H5>
      <ul>
        {allUsers
          .filter((el: IUserInitialState) => el.email !== user.email)
          .map((el: IUserInitialState) => (
            <li key={el.email}>
              <Button className={s.users__btn} variant="transparent">
                <span>{el.email}</span>
              </Button>
            </li>
          ))}
      </ul>
    </Section>
  );
};

export default ChatUsers;
