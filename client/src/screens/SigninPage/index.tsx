import Section from '@/components/ui/Section';
import H2 from '@/components/ui/Typography/H2';

import s from './index.module.scss';
import SigninForm from './SigninForm';

const SigninPage = () => {
  return (
    <Section className={s.signin}>
      <H2>Sign In</H2>
      <SigninForm />
    </Section>
  );
};

export default SigninPage;
