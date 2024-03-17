import styles from "./module-css/City.module.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCities} from "../contexts/CitiesContext.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useEffect} from "react";
import BackButton from "./BackButton.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const {id} = useParams()
  const navigate = useNavigate();

  const {getCity, currentCity, loading, error} = useCities();

  useEffect(() => {
    getCity(id)
  }, [id]);

  const {cityName, emoji, date, notes} = currentCity;

  if (loading) return <Spinner/>;
  if (error) return <Message message={error}/>

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton/>
      </div>
    </div>
  );
}

export default City;