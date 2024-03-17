import styles from "./module-css/Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import Button from "./Button.jsx";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');


  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      <div className={styles.map}>
        <div>MAP</div>
        <div className='fs-1 text-bg-info'>
          lat : {lat}
          lng: {lng}
        </div>
      <Button
        type='primary'
        onClick={() => setSearchParams({lat: 23, lng: 99})}>
        Change position
      </Button>
      </div>

    </div>
  );
}

export default Map;