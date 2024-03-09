'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import { socket } from '@/servises/apiWs';
import { refreshUserThunk, verifyEmailThunk } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';
import { verifySchema } from '@/utils/validation';

import H4 from '../ui/Typography/H4';
import s from './index.module.scss';

type Inputs = {
  verificationCode: string;
};

const CodeForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(verifySchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(verifyEmailThunk({ ...data, email: user.email }))
      .unwrap()
      .then(pld => socket.emit('joinUser', pld.result.user.email))
      .then(() => dispatch(refreshUserThunk()))
      .then(() => router.push('/'))
      .catch(err => err.includes('401') && toast.error('Unauthorized'));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <H4>{`Verify: ${user.email}`}</H4>

      <label className={s.label}>
        Code <span> {errors.verificationCode?.message}</span>
        <input
          placeholder=""
          className={classNames(
            s.input,
            errors.verificationCode ? s.invalid : s.valid,
          )}
          {...register('verificationCode', { required: true })}
        />
      </label>

      <Button type="submit" size="m" label="Submit" />
    </form>
  );
};

export default CodeForm;
