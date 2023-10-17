import { createContext, useContext, useEffect, useState } from "react";

 const CitiesContext = createContext();

function CitiesContextProvider({ Children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);

  console.log("🚀 ~ file: App.jsx:22 ~ App ~ selectedCity:", selectedCity);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8001/cities")
      .then((data) => data.json())
      .then((res) => setCities(res))
      .catch((e) => console.log(e));
    setIsLoading(false);
    // console.log(cities)
    // console.log(isLoading)
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        selectedCity,
        setSelectedCity,
      }}
    >
      {Children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) throw new Error("access denied");
  return context;
}

export { CitiesContextProvider, useCities };
