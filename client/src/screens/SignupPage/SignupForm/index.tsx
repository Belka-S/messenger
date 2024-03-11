'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { InferType } from 'yup';

import Button from '@/components/ui/Button';
import { registerThunk } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';
import { signupSchema } from '@/utils/validation';

import s from './index.module.scss';

type Inputs = InferType<typeof signupSchema>;

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const resolver: Resolver<Inputs> = yupResolver(signupSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(registerThunk(data));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label}>
        Name <span> {errors.name?.message}</span>
        <input
          placeholder=""
          className={classNames(s.input, errors.name ? s.invalid : s.valid)}
          {...register('name', { required: true })}
        />
      </label>

      <label className={s.label}>
        Email <span> {errors.email?.message}</span>
        <input
          placeholder=""
          className={classNames(s.input, errors.email ? s.invalid : s.valid)}
          {...register('email', { required: true })}
        />
      </label>

      <label className={s.label}>
        Password <span>⁣ {errors.password?.message}</span>
        <input
          placeholder=""
          className={classNames(s.input, errors.password ? s.invalid : s.valid)}
          {...register('password', { required: true })}
        />
      </label>

      <Button type="submit" size="m" label="Submit" />

      <Link className={s.navlink} href={'/signin'}>
        Have an account?
      </Link>
    </form>
  );
};

export default SignupForm;
