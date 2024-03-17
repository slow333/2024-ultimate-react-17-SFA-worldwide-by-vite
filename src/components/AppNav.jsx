import styles from './module-css/AppNav.module.css'
import { NavLink} from "react-router-dom";

const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <NavLink to='cities'>cities</NavLink>
        <NavLink to='countries'>countries</NavLink>
      </ul>
    </nav>
  );
}

export default AppNav;