import styles from "./module-css/CountryList.module.css";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import Spinner from "./Spinner.jsx";
import {useCities} from "../contexts/CitiesContext.jsx";

const CountryList = () => {
  const { cities, loading } = useCities();

  if (!cities.length)
    return <Message message='데이터가 없어요..'/>
  if(loading) return <Spinner/>

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, {country: city.country, emoji: city.emoji, id:city.id}]
    else return arr;
  },[] );

  return (
    <div className={styles.countryList}>
      {countries.map(cn => <CountryItem key={cn.id} country={cn.country} emoji={cn.emoji}/>)}
    </div>
  );
}

export default CountryList;