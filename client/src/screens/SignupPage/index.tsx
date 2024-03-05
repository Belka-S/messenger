'use client';

import { useEffect, useState } from 'react';

import CodeForm from '@/components/CodeForm';
import Modal from '@/components/Modal';
import Section from '@/components/ui/Section';
import H2 from '@/components/ui/Typography/H2';
import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';
import SignupForm from './SignupForm';

const SignupPage = () => {
  const { user } = useAuth();
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    setIsModal(user.email && !user.verifiedEmail);
  }, [user]);

  return (
    <Section className={s.signup}>
      <H2>Sign Up</H2>

      <SignupForm />

      {isModal && (
        <Modal setIsModal={setIsModal}>
          <CodeForm />
        </Modal>
      )}
    </Section>
  );
};

export default SignupPage;
