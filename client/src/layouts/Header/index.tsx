'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

import Button from '@/components/ui/Button';
import SvgIcon from '@/components/ui/SvgIcon';

import s from './Header.module.scss';
import Menu from './Menu';

const Header = () => {
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
          <Button
            className={s.header__btn}
            onClick={handleClick}
            type="button"
            // variant="outlined"
            size="m"
          >
            <SvgIcon id="burger" width={20} height={20} />
          </Button>
        </div>
      </header>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
