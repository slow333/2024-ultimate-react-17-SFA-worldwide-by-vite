import styles from './module-css/AppNav.module.css'
import SideBar from "./SideBar.jsx";

const AppNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
      <SideBar/>
      <div>app nav</div>

      </ul>
    </nav>
  );
}

export default AppNav;