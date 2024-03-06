'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import OvalLoader from '@/components/Loader/OvalLoader';
import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';
import { logoutThunk } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import s from './Header.module.scss';
import Menu from './Menu';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, isAuth, isLoading, isRefreshing } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
    e.currentTarget.blur();
  };

  return (
    <>
      <header className={s.header}>
        <div className={classNames('container', s.header__wrap)}>
          <Link href={'/'} onClick={() => setIsOpen(false)}>
            <SvgIcon
              className={s.message}
              id="message"
              width={60}
              height={60}
            />
          </Link>

          {isAuth && (
            <Button
              className={s.header__user}
              onClick={() => dispatch(logoutThunk())}
              type="button"
              size="m"
              variant="transparent"
              label={user.email}
            >
              <SvgIcon id="logout" width={20} height={20} />
            </Button>
          )}

          <Button
            className={s.header__menu}
            onClick={handleClick}
            type="button"
            size="m"
          >
            <SvgIcon id="burger" width={20} height={20} />
          </Button>
        </div>
      </header>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

      {isLoading && isRefreshing && <OvalLoader />}
    </>
  );
};

export default Header;
