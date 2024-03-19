// noinspection JSCheckFunctionSignatures

import {createContext, useContext, useEffect, useReducer} from "react";
import Message from "../components/Message.jsx";

const CitiesContext = createContext();

const initialState = {cities: [], isLoading: false, error: '', currentCity: {}}

function reducer(state, action) {

  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      }
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case 'city/delete':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      }
    case 'city/create':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    case "city/current":
      return {...state, currentCity: action.payload, isLoading: false}
    default:
      throw new Error("no type found")
  }
}

const CitiesProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const {cities, isLoading, error, currentCity} = state;

  useEffect(() => {
    async function getData() {
      dispatch({type: "loading"});
      try {
        const res = await fetch('http://localhost:9090/cities');
        const data = await res.json();
        dispatch({type: "cities/loaded", payload: data});
        dispatch({type: "rejected", payload: ''});
      } catch (err) {
        dispatch({type: "rejected", payload: "데이터 로딩 실패..."});
      }
    }
    getData();
  }, []);

  async function getCity(id) {
    if(id === currentCity.id+'') return;
    dispatch({type: "loading"});
    try {
      const res = await fetch(`http://localhost:9090/cities/${id}`);
      if (!res.ok) throw new Error('데이터 수신 실패.')
      const data = await res.json();
      dispatch({type: "city/current", payload: data});
      dispatch({type: "rejected", payload: ''});
    } catch (err) {
      dispatch({type: "rejected", payload: "현재 도시 데이터 수신 실패"});
    }
  }

  async function createCity(newCity) {
    dispatch({type: "loading"});
    try {
      const res = await fetch(`http://localhost:9090/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-type": "application/json"
        },
      });
      const data = await res.json();

      dispatch({type: "city/create", payload: data});
    } catch (err) {
      dispatch({type: "rejected", payload: '데이터 추가에 문제 발생'});
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({type: "loading"});
      const res = await fetch(`http://localhost:9090/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type: "city/delete", payload: id});
    } catch (err) {
      dispatch({type: "rejected", payload: '삭제에 문제 발생'});
    }
  }

  return (
       <CitiesContext.Provider
            value={{
              cities, isLoading, error, currentCity,
              getCity, createCity, deleteCity
            }}>
         {children}
       </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("콘텍스트 밖에서 정의 했어요..⛔⛔⛔.")
  return context;
}

export {CitiesProvider, useCities};