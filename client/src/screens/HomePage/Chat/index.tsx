'use client';

import classNames from 'classnames';
import { FC } from 'react';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';
import { socket } from '@/servises/apiWs';
import { IUserInitialState } from '@/store/auth/initialState';
import { deleteElement, fetchElements } from '@/store/elements/elementSlice';
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
    socket.emit('deleteMessage', el, (resp: string) => {
      console.log('resp: ', resp);
      resp === 'ok' && dispatch(deleteElement(el));
    });
    // dispatch(fetchElementsThunk()).unwrap().catch(err => toast.error(err.message));
    socket.emit('fetchMessages', 'all', (resp: any) => {
      resp.docs && dispatch(fetchElements(resp.docs));
    });
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

  const isPartner = user.email !== partner.email;

  return (
    <ul>
      <div className={s.chat__title}></div>
      {filtredMsg.map((msg: IMsg) => {
        const isMyMsg = msg.owner === user.email;

        if (isPartner) {
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
                  {msg.fileUrl && (
                    <a
                      className={s.attachment}
                      href={msg.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      attachment
                    </a>
                  )}
                  <span className={s.date}>{msg.createdAt}</span>
                </div>
              </div>
              {!isMyMsg && <span className={s.owner}>{partner.name}</span>}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Chat;
