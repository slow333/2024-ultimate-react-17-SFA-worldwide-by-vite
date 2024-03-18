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
      <div className={styles.footer}>vite, react, useContext, react-router-dom@6</div>
      <div className={styles.copyright}> world tour &copy;www.logcenter.info</div>
    </div>
  );
}

export default SideBar;