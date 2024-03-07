'use client';

import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';
import { IUserInitialState } from '@/store/auth/initialState';
import {
  deleteElementThunk,
  fetchElementsThunk,
} from '@/store/elements/elementThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth, useElements } from '@/utils/hooks';

import { IMsg } from '..';
import s from './index.module.scss';

interface IChatProps {
  filterMsgs: (partner: IUserInitialState) => IMsg[];
  partner: IUserInitialState;
  setInitialMsg: (initialMsg: IMsg | null) => void;
}

const Chat: FC<IChatProps> = ({ filterMsgs, partner, setInitialMsg }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { msgHistory } = useElements();

  useEffect(() => {
    dispatch(fetchElementsThunk());
  }, [dispatch]);

  const handleDeleteMsg = (el: IMsg) => {
    if (!confirm('Are you sure you want to delete message?')) {
      return;
    }
    dispatch(deleteElementThunk(el))
      .unwrap()
      .then(() => dispatch(fetchElementsThunk()))
      .catch(err => toast.error(err.message ? `${err.message}` : 'Error'));
  };

  const handleUpdateMsg = (msg: IMsg) => {
    setInitialMsg(msg);
    const formElInput = document.getElementById('msg-form') as HTMLInputElement;
    formElInput?.focus();
    formElInput.value = msg.message;
  };

  return (
    <ul>
      <div className={s.chat__title}>
        <span>me</span>
        <span>{partner.name}</span>
      </div>
      {filterMsgs(partner).map((msg: IMsg) => {
        const isMyMsg = msg.owner === user.email;

        return (
          <li
            className={classNames(s.chat__msg, isMyMsg ? s.left : s.right)}
            key={msg.id}
          >
            <div
              className={classNames(
                s.chat__msg_wrap,
                isMyMsg ? s.left : s.right,
              )}
            >
              <p>{msg.message}</p>
              <div className={s.date__wrap}>
                <div>
                  <Button
                    variant="transparent"
                    onClick={() => handleDeleteMsg(msg)}
                  >
                    <SvgIcon id="trash" width={16} height={16} />
                  </Button>
                  {isMyMsg && (
                    <Button
                      variant="transparent"
                      onClick={() => handleUpdateMsg(msg)}
                    >
                      <SvgIcon id="edit" width={16} height={16} />
                    </Button>
                  )}
                </div>

                <span className={s.date}>{msg.createdAt}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Chat;
