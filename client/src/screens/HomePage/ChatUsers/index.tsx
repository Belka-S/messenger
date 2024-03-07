'use client';

import { FC, useEffect } from 'react';

import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import H5 from '@/components/ui/Typography/H5';
import H6 from '@/components/ui/Typography/H6';
import { getAllUsersThunk } from '@/store/auth/authThunks';
import { IUserInitialState } from '@/store/auth/initialState';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import { IMsg } from '..';
import s from './index.module.scss';

interface IChatUsersProps {
  filterMsgs: (partner: IUserInitialState) => IMsg[];
  setPartner: (partner: IUserInitialState) => void;
  partner: IUserInitialState;
}

const ChatUsers: FC<IChatUsersProps> = ({
  filterMsgs,
  setPartner,
  partner,
}) => {
  const dispatch = useAppDispatch();
  const { user, allUsers } = useAuth();

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  return (
    <Section>
      <H5 className={s.users__title}>Have a chat with:</H5>
      <ul>
        {allUsers
          .filter((el: IUserInitialState) => el.email !== user.email)
          .map((el: IUserInitialState) => (
            <li className={s.users__item} key={el.email}>
              <H6 className={s.item__name} fontWeight={500}>{`${el.name}`}</H6>

              <span className={s.users__count}>{`[ ${
                filterMsgs(el).length
              } ]`}</span>

              <Button
                className={s.users__btn}
                size="s"
                variant={el.email === partner.email ? 'default' : 'transparent'}
                onClick={e => {
                  setPartner(el);
                  e.currentTarget.blur();
                }}
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
