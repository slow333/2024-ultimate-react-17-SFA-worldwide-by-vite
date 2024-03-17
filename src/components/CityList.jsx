import styles from "./module-css/CityList.module.css"

import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CityItem from "./CityItem.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

const CityList = () => {

  const {cities, loading, error} = useCities();

  if(loading) return <Spinner/>

  if(!cities.length) {
    return <Message message={error}/>
  }

  return (
    <ul className={styles.cityList}>
      {cities.map(city =>
        <CityItem key={city.id} city={city} isLoading={loading}/>
      )}
    </ul>
  );
}

export default CityList;