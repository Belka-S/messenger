'use client';

import { FC, useEffect } from 'react';

import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { getAllUsersThunk } from '@/store/auth/authThunks';
import { IUserInitialState } from '@/store/auth/initialState';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';

interface IChatUsersProps {
  setPartner: (partner: IUserInitialState) => void;
}

const ChatUsers: FC<IChatUsersProps> = ({ setPartner }) => {
  const dispatch = useAppDispatch();
  const { user, allUsers } = useAuth();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  return (
    <Section>
      <ul>
        {allUsers
          .filter((el: IUserInitialState) => el.email !== user.email)
          .map((el: IUserInitialState) => (
            <li key={el.email}>
              <Button
                className={s.users__btn}
                variant="transparent"
                onClick={() => setPartner(el)}
              >
                <span>{el.email}</span>
              </Button>
            </li>
          ))}
      </ul>
    </Section>
  );
};

export default ChatUsers;
