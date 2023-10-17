import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";

import { CitiesContext } from "../App";
import { useContext } from "react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { selectedCity, setSelectedCity } = useContext(CitiesContext);

  const { cityName, emoji, date, id, position } = city;

  return (
    <li onClick={() => setSelectedCity(id)}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          selectedCity === id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
