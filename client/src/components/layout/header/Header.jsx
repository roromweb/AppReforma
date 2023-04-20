import { IoMdArrowBack } from 'react-icons/io';

import { useAuth } from '../../../hooks/useAuth';

import Hamburger from '../../hamburger/Hamburger';

import styles from './Header.module.scss';

function Header({ backLink }) {
  const { isAuth } = useAuth();

  return (
    <header className={styles.header}>
      <button onClick={() => {}}>
        <IoMdArrowBack fill="#fff" fontSize={29} />
      </button>
      {/* User profile */}
      <Hamburger />
    </header>
  );
}

export default Header;
