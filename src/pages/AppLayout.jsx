import styles from "./module-css/AppLayout.module.css"
import SideBar from "../components/SideBar.jsx";
import Map from "../components/Map.jsx";
import User from "../components/User.jsx";

const AppLayout = () => {
  return (
    <div className={styles.app}>
       <SideBar/>
       <Map/>
      <User/>
    </div>
  );
}

export default AppLayout;