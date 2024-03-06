'use client';

import classNames from 'classnames';
import { useEffect, useState } from 'react';

import CodeForm from '@/components/CodeForm';
import Modal from '@/components/Modal';
import Section from '@/components/ui/Section';
import H2 from '@/components/ui/Typography/H2';
import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';
import SigninForm from './SigninForm';

const SigninPage = () => {
  const { user } = useAuth();
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    setIsModal(user.email && !user.verifiedEmail);
  }, [user]);

  return (
    <div className={classNames('container', s.signin)}>
      <H2>Sign In</H2>

      <SigninForm />

      {isModal && (
        <Modal setIsModal={setIsModal}>
          <CodeForm />
        </Modal>
      )}
    </div>
  );
};

export default SigninPage;
