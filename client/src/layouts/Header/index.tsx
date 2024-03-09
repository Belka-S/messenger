'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import OvalLoader from '@/components/Loader/OvalLoader';
import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';
import H3 from '@/components/ui/Typography/H3';
import { socket } from '@/servises/apiWs';
import { logoutThunk } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/hooks';
import { useAuth } from '@/utils/hooks';

import s from './index.module.scss';
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
              className={isAuth ? s.active : s.messenger}
              id="message"
              width={60}
              height={60}
            />
          </Link>

          {isAuth && <H3 className={s.messenger}>Messenger</H3>}

          <div className={s.header__menu}>
            {isAuth ? (
              <Button
                onClick={() => {
                  dispatch(logoutThunk());
                  socket.emit('leftUser', user.email);
                }}
                type="button"
                size="m"
                variant="transparent"
                label={user.email}
              >
                <SvgIcon id="logout" width={20} height={20} />
              </Button>
            ) : (
              <Button
                className={s.header__menu_btn}
                onClick={handleClick}
                type="button"
                size="m"
              >
                <SvgIcon id="burger" width={20} height={20} />
              </Button>
            )}
          </div>
        </div>
      </header>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />

      {isLoading && isRefreshing && <OvalLoader />}
    </>
  );
};

export default Header;
