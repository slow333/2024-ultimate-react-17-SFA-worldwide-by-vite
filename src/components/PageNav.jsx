import styles from './module-css/PageNav.module.css'
import {NavLink} from "react-router-dom";
import Logo from "./Logo.jsx";
import {useAuth} from "../contexts/FakeAuthContext.jsx";
const PageNav = () => {
  const {isAuthenticated} = useAuth();
  return (
    <div className={styles.nav}>
       <Logo/>
       <ul>
          {/*<li><NavLink to='/'>Home</NavLink></li>*/}
          <li><NavLink to='/pricing'>Pricing</NavLink></li>
          <li><NavLink to='/product'>Product</NavLink></li>
          <li><NavLink to='/login' className={styles.ctaLink}>{isAuthenticated ? 'logout': 'login'}</NavLink></li>
       </ul>
    </div>
  );
}

export default PageNav;