import styles from "./module-css/CityItem.module.css";
import {Link} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext.jsx";

const CityItem = ({city}) => {
  const {cityName, emoji, date, id, position, country} = city;
  const {currentCity, deleteCity} = useCities();

  const formatDate = (date) =>
       new Intl.DateTimeFormat("kor", {
         day: "numeric",
         month: "long",
         year: "numeric",
         weekday: "long",
       }).format(new Date(date));
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
       <div>
         <Link className={`${styles.cityItem} 
               ${currentCity.id === id ? styles["cityItem--active"] : ''}`}
               to={`${id}?lat=${position.lat}&lng=${position.lng}`}>

           <span className={styles.emoji}>{emoji}</span>
           <h3 className={styles.name}> {cityName},{country}</h3>
           <time className={styles.date}>{formatDate(date)}</time>
           <button className={styles.deleteBtn} onClick={handleClick}
           >&times;</button>
         </Link>
       </div>
  );
}

export default CityItem;