import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";
import {lazy, Suspense} from "react";

// import Homepage from "./pages/Homepage.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Product from './pages/Product.jsx'
// import PageNotFound from "./pages/PageNotFound.jsx";
// import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import Map from "./components/Map.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const Homepage = lazy(() => import('./pages/Homepage.jsx'))
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const Product = lazy(() => import('./pages/Product.jsx'))
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))


// dist/assets/index-cda340c5.css   81.99 kB │ gzip:  11.16 kB
// dist/assets/index-7737f75a.js   513.04 kB │ gzip: 147.98 kB

export default function App() {

  return (
       <AuthProvider>
         <CitiesProvider>
           <BrowserRouter>
             <Suspense fallback={<SpinnerFullPage/>}>
               <Routes>
                 <Route index element={<Homepage/>}/>
                 <Route path='app' element={
                   <ProtectedRoute>
                     <AppLayout/>
                   </ProtectedRoute>
                 }>
                   <Route index element={<Navigate replace to='cities'/>}/>
                   <Route path='cities' element={<CityList/>}/>
                   <Route path='cities/:id' element={<City/>}/>
                   <Route path='countries' element={<CountryList/>}/>
                   <Route path='map' element={<Map/>}/>
                   <Route path='form' element={<Form/>}/>
                 </Route>
                 <Route path='product' element={<Product/>}/>
                 <Route path='pricing' element={<Pricing/>}/>
                 <Route path='login' element={<Login/>}/>
                 <Route path='*' element={<PageNotFound/>}/>
               </Routes>
             </Suspense>
           </BrowserRouter>
         </CitiesProvider>
       </AuthProvider>
  )
       ;
}
