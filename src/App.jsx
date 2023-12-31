import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useReducer } from "react";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";

import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { JSON_SERVER_URL } from "./Appsetup";
import Message from "./components/Message";

export const CitiesContext = createContext();

const initialState = {
  cities: [],

  isLoading: false,

  selectedCity: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CITIES":
      return { ...state, cities: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SELECTED_CITY":
      return { ...state, selectedCity: action.payload };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, selectedCity } = state;

  function fetchCities() {
    // setIsLoading(true);
    dispatch({ type: "SET_IS_LOADING", payload: true });
    fetch(`${JSON_SERVER_URL}/cities`)
      .then((data) => data.json())
      .then((res) => dispatch({ type: "SET_CITIES", payload: res }))
      .catch((e) => console.log(e));
    dispatch({ type: "SET_IS_LOADING", payload: false });
  }

  useEffect(() => {
    fetchCities();
  }, []);

  function setNewCity(newCity) {
    dispatch({ type: "SET_IS_LOADING", payload: true });
    fetch(`${JSON_SERVER_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((res) => {
        dispatch({ type: "SET_CITIES", payload: [...state.cities, res] });
        dispatch({ type: "SET_IS_LOADING", payload: false });
      })
      .catch((e) => console.log(e));
  }
  function deleteCity(id) {
    fetch(`http://localhost:8001/cities/${id}`, {
      method: "DELETE",
    });
    fetchCities();
  }

  return (
    <AuthProvider>
      <CitiesContext.Provider
        value={{
          cities,
          isLoading,
          selectedCity,
          dispatch,
          setNewCity,
          deleteCity,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Product" element={<Product />} />
            <Route path="Login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Message
                    message={
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est dicta illum vero culpa cum quaerat architecto sapiente eius non soluta, molestiae nihil laborum, placeat debitis,"
                    }
                  />
                }
              />
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
    </AuthProvider>
  );
}
