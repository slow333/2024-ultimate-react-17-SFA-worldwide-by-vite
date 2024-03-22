import {useState} from 'react';

export const useGeoLocation = (defaultPosition = null) => {

  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("브라우저에서 geolocation을 미지원 함니다")
    }
    setIsLoading(true);
    navigator.geolocation
         .getCurrentPosition((pos) => {
                setPosition({
                  lat: pos.coords.latitude, lng: pos.coords.longitude
                });
                setIsLoading(false);
              },
              (error) => {
                setError(error.message);
                setIsLoading(false);
              });
  }

  return {position, isLoading, error, getPosition}
}

// 36.4281856
// 127.3921536