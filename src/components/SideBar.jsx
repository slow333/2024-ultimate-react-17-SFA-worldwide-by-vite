import styles from './module-css/Sidebar.module.css'
import Logo from "./Logo.jsx";
import AppNav from "./AppNav.jsx";
import {Outlet} from "react-router-dom";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav/>
      <Outlet/>
      <div className={styles.footer}>footer</div>
      <div className={styles.copyright}>copyright</div>
    </div>
  );
}

export default SideBar;