'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import H4 from '@/components/ui/Typography/H4';
import { socket } from '@/servises/apiSocket.io';
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
}

const ChatForm: FC<IChatFormProps> = ({ setMsgArr }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(messageSchema);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  useEffect(() => {
    socket.on('chatMessage', msg => {
      setMsgArr((state: IMsg[]) => [...state, msg]);
    });
    socket.on('connect', () => console.log('Connected to WS-server'));
  }, [setMsgArr]);

  const onSubmit: SubmitHandler<Inputs> = async ({ message }) => {
    // dispatch(verifyEmailThunk({ ...data, email: user.email }))
    //   .unwrap()
    //   .then(() => dispatch(refreshUserThunk()))
    //   .then(() => router.push('/'))
    //   .catch(err => err.includes('401') && toast.error('Unauthorized'));

    const msg: IMsg = {
      ms: getDate().ms.toString(),
      date: getDate().format,
      owner: user.email,
      message,
    };
    setMsgArr((state: IMsg[]) => [...state, msg]);
    socket.emit('chatMessage', msg);

    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <H4>{`Chat with ${user.email}`}</H4>

      <label className={s.label}>
        Message <span> {errors.message?.message}</span>
        <input
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
