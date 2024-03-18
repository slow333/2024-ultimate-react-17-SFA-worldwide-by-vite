// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./module-css/Form.module.css";
import {useNavigate, useSearchParams} from "react-router-dom";
import BackButton from "./BackButton.jsx";
import useUrlPosition from "../hooks/useUrlPosition.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import Button from "./Button.jsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import {useCities} from "../contexts/CitiesContext.jsx";
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [lat, lng] = useUrlPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] =useState('');
  const [geocodingError, setGeocodingError] = useState('');
  const { createCity } = useCities();

  useEffect(() => {
    if(!lat && !lng) return ;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error("그 지역에는 나라가 없어용..💥💥💥")
        }
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode))
        setIsLoadingGeocoding(false)
      } catch (err) {
        setIsLoadingGeocoding(false)
        setGeocodingError(err.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData();
  }, [lat, lng]);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    if(!cityName || !date) return;
    const newCity = {
      cityName, country, emoji, date, notes, position: {lat, lng}
    };
    createCity(newCity)
  }

  if(isLoadingGeocoding) return <Spinner/>

  if(!lat && !lng) return <Message message="현재 위치가 지정되지 않았습니다. 🙅🏼🙅🏼🙅🏼"/>;

  if(geocodingError) return <Message message={geocodingError}/>

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker onChange={ date => setDate(date)} selected={date} dateFormat='yyyy-MM-dd'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
