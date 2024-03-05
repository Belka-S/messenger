import Section from '@/components/ui/Section';
import H2 from '@/components/ui/Typography/H2';

import s from './index.module.scss';
import SignupForm from './SignupForm';

const SignupPage = () => {
  return (
    <Section className={s.signup}>
      <H2>Sign Up</H2>
      <SignupForm />
    </Section>
  );
};

export default SignupPage;
