'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Link from 'next/link';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';
import { signupSchema } from '@/utils/validation';

import s from './index.module.scss';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const resolver: Resolver<Inputs> = yupResolver(signupSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onBlur', resolver });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    return data;
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
