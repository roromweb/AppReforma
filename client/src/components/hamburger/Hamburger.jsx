/* eslint-disable react/button-has-type */
import { CgMenuRight } from 'react-icons/cg';
import { IoClose } from 'react-icons/io5';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import styles from './Hamburger.module.scss';
import Menu from './Menu';

function Hamburger() {
  const { isShow, ref, setIsShow } = useOnClickOutside(false);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button onClick={() => setIsShow(!isShow)}>{isShow ? <IoClose /> : <CgMenuRight />}</button>
      <Menu isShow={isShow} />
    </div>
  );
}

export default Hamburger;
