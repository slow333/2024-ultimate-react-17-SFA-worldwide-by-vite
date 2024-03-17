import styles from "./module-css/AppLayout.module.css"
import SideBar from "../components/SideBar.jsx";
import Map from "../components/Map.jsx";

const AppLayout = () => {
  return (
    <div className={styles.app}>
       <SideBar/>
       <Map/>
    </div>
  );
}

export default AppLayout;