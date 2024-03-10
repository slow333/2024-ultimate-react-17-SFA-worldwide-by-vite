import styles from './module-css/Sidebar.module.css'
import Logo from "./Logo.jsx";
import City from "./City.jsx";
const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <section>
        <Logo/>
        <City/>
      </section>
      <div className={styles.footer}>footer</div>
      <div className={styles.copyright}>copyright</div>
    </div>
  );
}

export default SideBar;