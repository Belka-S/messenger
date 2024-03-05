'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/ui/Button';
import { loginThunk } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';
import { signinSchema } from '@/utils/validation';

import s from './index.module.scss';

type Inputs = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const resolver: Resolver<Inputs> = yupResolver(signinSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver,
    mode: 'onBlur',
    defaultValues: { email: user.email },
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(pld => pld.result.user.verifiedEmail && router.push('/'))
      .catch(err => err.includes('401') && toast.error('Unauthorized'));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
      <Link className={s.navlink} href={'/signup'}>
        Don`t have an account?
      </Link>
    </form>
  );
};

export default SigninForm;
