import {useEffect, useState} from "react";

const useAsyncFetchCities = () => {
   const [cities, setCities] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('')

   useEffect(() => {
      async function getData() {
         try {
            setLoading(true)
            const res = await fetch('http://localhost:9090/cities');
            if(!res.ok) throw new Error('데이터 수신 실패.')
            const data = await res.json();
            setCities(data);
            setError('')
         } catch (err) {
            // setCities([])
            setError(err.message)
         } finally {
            setLoading(false)
         }
      }
      getData();
   }, []);

   return { cities, loading, error }

}

export default useAsyncFetchCities;