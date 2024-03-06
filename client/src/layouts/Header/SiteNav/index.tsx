'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';

interface ISiteNavProps {
  className?: string;
}

const SiteNav: FC<ISiteNavProps> = ({ className }) => {
  const pathname = usePathname();
  const { isAuth } = useAuth();
  // page height
  // if (typeof window !== 'undefined') { const bodyEl = document.querySelector('body');
  //   if (bodyEl) { bodyEl.style.height = pathname === '/' ? '100vh' : ''; } }
  const setClassName = (path: string) => {
    return classNames(s.nav__link, pathname === path && s.active);
  };

  return (
    <nav className={classNames(s.nav, className)}>
      {isAuth && (
        <Link className={setClassName('/')} href={'/'}>
          Home
        </Link>
      )}
      <Link className={setClassName('/signin')} href={'/signin'}>
        Sign In
      </Link>
      <Link className={setClassName('/signup')} href={'/signup'}>
        Sign Up
      </Link>
    </nav>
  );
};

export default SiteNav;
