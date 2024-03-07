'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import { socket } from '@/servises/apiSocket.io';
import { IUserInitialState } from '@/store/auth/initialState';
import { updateElementThunk } from '@/store/elements/elementThunks';
import { useAppDispatch } from '@/store/hooks';
import { getDate } from '@/utils/helpers';
import { useAuth } from '@/utils/hooks';
import { messageSchema } from '@/utils/validation';

import { IMsg } from '..';
import s from './index.module.scss';

export type Inputs = {
  message: string;
};

interface IChatFormProps {
  setMsgArr: (f: (state: IMsg[]) => IMsg[]) => void;
  partner: IUserInitialState;
  initialMsg: IMsg | null;
  setInitialMsg: (initialMsg: IMsg | null) => void;
}

const ChatForm: FC<IChatFormProps> = props => {
  const { setMsgArr, partner, initialMsg, setInitialMsg } = props;
  console.log('qwe: ', initialMsg);

  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(messageSchema);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  useEffect(() => {
    // socket.on('connect', () => console.log('Connected to WS-server'));
    socket.on('chatMessage', msg => {
      setMsgArr((state: IMsg[]) => [...state, msg]);
    });
  }, [setMsgArr]);

  const onSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    let msg: IMsg = {
      id: getDate().ms,
      createdAt: getDate().format,
      owner: user.email,
      partner: partner.email,
      message,
    };

    if (initialMsg) {
      console.log('initialMsg: ', initialMsg);
      msg = { ...initialMsg, message };
      dispatch(updateElementThunk(msg));
    } else {
      socket.emit('chatMessage', msg);
      setMsgArr((state: IMsg[]) => [...state, msg]);
    }

    setInitialMsg(null);
    reset();
  };

  const isPartner = user.email !== partner.email;

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label}>
        Message
        {isPartner && (
          <>
            &nbsp;for
            <span className={s.label__name}>{` ${partner.name}`}</span>
          </>
        )}
        <span className={s.label__error}> {errors.message?.message}</span>
        <input
          id="msg-form"
          placeholder=""
          className={classNames(s.input, errors.message ? s.invalid : s.valid)}
          {...register('message', { required: true })}
        />
      </label>

      <Button type="submit" size="m" label="Send" />
    </form>
  );
};

export default ChatForm;
