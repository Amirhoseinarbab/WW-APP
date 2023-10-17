import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { useContext } from "react";
import { CitiesContext } from "../App";

export default function CountryList() {
  const { cities, isLoading } = useContext(CitiesContext);
  console.log("🚀 ~ file: CountryList.jsx:10 ~ CountryList ~ cities:", cities)

  if (isLoading) return <Spinner />;

  if (!cities.length && !isLoading)
    return <Message message={"    Nothing Added To The List..."} />;

  const addedCountries = cities.reduce(
    (addedCountries, city) =>
      addedCountries.map((a) => a.country).includes(city.country)
        ? addedCountries
        : [...addedCountries, { country: city.country, emoji: city.emoji }],
    []
  );

  return (
    <ul className={styles.countryList}>
    

      {addedCountries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}
