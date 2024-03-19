import styles from "./module-css/Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useGeoLocation} from "../hooks/useGeoLocation.jsx";
import Button from "./Button.jsx";
import useUrlPosition from "../hooks/useUrlPosition.jsx";

const copyRightMap = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
const Map = () => {
  const {cities} = useCities();

  const {
    getPosition, position: geoLocationPosition, isLoading: isLoadingPosition
  } = useGeoLocation()
  // 36.4307847 , 127.3972961

  const [mapPosition, setMapPosition] = useState([36.4307847, 127.3972961]);
  const [mapLat, mapLng] = useUrlPosition();


  useEffect(() => {
    if (mapLng && mapLat) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }
  }, [ geoLocationPosition ]);

  return (
       <div className={styles.mapContainer}>
         {!geoLocationPosition && <Button type='position' onClick={getPosition}>
           {isLoadingPosition ? 'Loading...' : "use your position"}
         </Button>}
         <MapContainer
              center={mapPosition}
              zoom={5}
              scrollWheelZoom={true}
              className={styles.mapContainer}
         >
           <TileLayer
                attribution={copyRightMap}
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
           />
           { cities.map(city =>
                <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                  <Popup>
                    <span>{city.cityName}</span>
                  </Popup>
                </Marker>
           )}
           <ChangeCenter position={mapPosition} zoom={6}/>
           <DetectClick/>
         </MapContainer>
       </div>
  );
}

function ChangeCenter({position, zoom}) {
  const map = useMap()
  map.setView(position, zoom);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map;