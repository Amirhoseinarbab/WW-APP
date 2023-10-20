import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";

import CountryList from "./components/CountryList";
import Form from "./components/Form";

export const CitiesContext = createContext();

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

function fetchCities(){
  setIsLoading(true);
  fetch("http://localhost:8001/cities")
  .then((data) => data.json())
  .then((res) => setCities(res))
  .catch((e) => console.log(e));
  setIsLoading(false)
  

}

  useEffect(() => {
    setIsLoading(true);
    fetchCities()
    setIsLoading(false);
    // console.log(cities)
    // console.log(isLoading)
  }, []);

  function setNewCity(newCity) {
    setIsLoading(true);
    fetch("http://localhost:8001/cities", {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((res) => setCities((city)=> [...city , res]))
      .catch((e) => console.log(e));
    setIsLoading(false);
  }
  function deleteCity(id) {
    fetch(`http://localhost:8001/cities/${id}`, {
      method: "DELETE",
    })
    fetchCities()

  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        selectedCity,
        setSelectedCity,
        setNewCity,
        deleteCity
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="Pricing" element={<Pricing />} />
          <Route path="Product" element={<Product />} />
          <Route path="Login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>important index rout!</p>} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path="cities/:id" element={<City cities={cities} />} />

            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CitiesContext.Provider>
  );
}
