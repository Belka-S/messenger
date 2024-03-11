'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { FC } from 'react';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { InferType } from 'yup';

import Button from '@/components/ui/Button';
import { socket } from '@/servises/apiWs';
import { IUserInitialState } from '@/store/auth/initialState';
import { addElement, updateElement } from '@/store/elements/elementSlice';
import { useAppDispatch } from '@/store/hooks';
import { getDate } from '@/utils/helpers';
import { useAuth } from '@/utils/hooks';
import { messageSchema } from '@/utils/validation';

import { IMsg } from '..';
import s from './index.module.scss';

export type Inputs = InferType<typeof messageSchema>;

interface IChatFormProps {
  partner: IUserInitialState;
  updatedMsg: IMsg | null;
  setUpdatedMsg: (updatedMsg: IMsg | null) => void;
  // setMsgArr: (f: (state: IMsg[]) => IMsg[]) => void;
}

const ChatForm: FC<IChatFormProps> = props => {
  const { partner, updatedMsg, setUpdatedMsg } = props;
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(messageSchema);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  const onSubmit: SubmitHandler<Inputs> = data => {
    const { message, files } = data;
    const id = getDate().ms;

    // message
    let msg: IMsg = {
      id,
      createdAt: getDate().format,
      owner: user.email,
      partner: partner.email,
      message,
      // file: files && files[0] ? files[0] : null,
      fileUrl: null,
    };
    if (updatedMsg) {
      msg = { ...updatedMsg, message };
      dispatch(updateElement(msg));
      socket.emit('updateMessage', msg);
    } else {
      dispatch(addElement(msg));
      socket.emit('addMessage', msg);
    }

    // file
    if (files && files[0]) {
      const fileObj = {
        id,
        owner: user.email,
        file: files[0],
        contentType: files[0].type,
        name: files[0].name,
      };

      socket.emit('uploadFile', fileObj);
    }

    setUpdatedMsg(null);
    reset();
  };

  const isPartner = user.email !== partner.email;
  const isFile = Boolean(watch('files')?.length);

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

      <label className={s.label}>
        File
        <span className={s.label__error}> {errors.files?.message}</span>
        <input
          id="file-form"
          type="file"
          className={classNames(
            s.input_f,
            isFile ? (errors.files ? s.invalid : s.valid) : '',
          )}
          {...register('files')}
        />
      </label>

      <Button type="submit" size="m" label="Send" />
    </form>
  );
};

export default ChatForm;
