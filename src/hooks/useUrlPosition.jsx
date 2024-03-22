import React from 'react';
import {useSearchParams} from "react-router-dom";

const useUrlPosition = () => {
  const [searchParams,_] = useSearchParams()
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return [ lat, lng ]
}

export default useUrlPosition;