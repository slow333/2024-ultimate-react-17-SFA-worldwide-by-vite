import styles from './module-css/PageNav.module.css'
import {NavLink} from "react-router-dom";
import Logo from "./Logo.jsx";
const PageNav = () => {
  return (
    <div className={styles.nav}>
       <Logo/>
       <ul>
          {/*<li><NavLink to='/'>Home</NavLink></li>*/}
          <li><NavLink to='/pricing'>Pricing</NavLink></li>
          <li><NavLink to='/product'>Product</NavLink></li>
          <li><NavLink to='/login' className={styles.ctaLink}>Login</NavLink></li>
       </ul>
    </div>
  );
}

export default PageNav;