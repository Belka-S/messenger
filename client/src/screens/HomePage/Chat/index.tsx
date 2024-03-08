'use client';

import classNames from 'classnames';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';
import { socket } from '@/servises/apiWs';
import { IUserInitialState } from '@/store/auth/initialState';
import {
  deleteElementThunk,
  fetchElementsThunk,
} from '@/store/elements/elementThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import { IMsg } from '..';
import s from './index.module.scss';

interface IChatProps {
  filterMsgs: (partner: IUserInitialState) => IMsg[];
  partner: IUserInitialState;
  setUpdatedMsg: (updatedMsg: IMsg | null) => void;
}

const Chat: FC<IChatProps> = ({ filterMsgs, partner, setUpdatedMsg }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const handleDeleteMsg = (el: IMsg) => {
    if (!confirm('Are you sure you want to delete message?')) {
      return;
    }
    dispatch(deleteElementThunk(el))
      .unwrap()
      .then(() => {
        dispatch(fetchElementsThunk());
        socket.emit('deleteMessage', el);
      })
      .catch(err => toast.error(err.message));
  };

  const handleupdatedMsg = (msg: IMsg) => {
    setUpdatedMsg(msg);
    const formElInput = document.getElementById('msg-form') as HTMLInputElement;
    formElInput?.focus();
    formElInput.value = msg.message;
  };

  const filtredMsg = filterMsgs(partner).sort((a, b) =>
    b.id.localeCompare(a.id),
  );

  return (
    <ul>
      <div className={s.chat__title}></div>
      {filtredMsg.map((msg: IMsg) => {
        const isMyMsg = msg.owner === user.email;

        return (
          <li
            className={classNames(s.chat__msg, isMyMsg ? s.left : s.right)}
            key={msg.id}
          >
            {isMyMsg && <span className={s.owner}>me</span>}
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
                      onClick={() => handleupdatedMsg(msg)}
                    >
                      <SvgIcon id="edit" width={16} height={16} />
                    </Button>
                  )}
                </div>

                <span className={s.date}>{msg.createdAt}</span>
              </div>
            </div>
            {!isMyMsg && <span className={s.owner}>{partner.name}</span>}
          </li>
        );
      })}
    </ul>
  );
};

export default Chat;
