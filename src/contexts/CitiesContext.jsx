import {createContext, useContext, useEffect, useState} from "react";

const CitiesContext = createContext();

const CitiesProvider = ({children}) => {
   const [cities, setCities] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [currentCity, setCurrentCity] = useState({});

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

   async function getCity(id) {
      try {
         setLoading(true)
         const res = await fetch(`http://localhost:9090/cities/${id}`);
         if(!res.ok) throw new Error('데이터 수신 실패.')
         const data = await res.json();
         setCurrentCity(data);
         setError('')
      } catch (err) {
         // setCities([])
         setError(err.message)
      } finally {
         setLoading(false)
      }
   }

  return (
    <CitiesContext.Provider
      value={{ cities, loading, error, currentCity, getCity  }}>
       {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
   const context = useContext(CitiesContext);
   if(context === undefined) throw new Error("콘텍스트 밖에서 정의 했어요...")
   return context;
}

export {CitiesProvider, useCities};