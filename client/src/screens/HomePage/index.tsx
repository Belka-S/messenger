'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Section from '@/components/ui/Section';
import H1 from '@/components/ui/Typography/H1';
import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';

const HomePage = () => {
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    isAuth ? router.push('/') : router.push('/signin');
  }, [isAuth, router]);

  if (isAuth)
    return (
      <Section className={s.home}>
        <H1>Messenger</H1>
      </Section>
    );
};

export default HomePage;
