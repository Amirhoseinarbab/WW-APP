import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

import { CitiesContext } from '../App';
import { useContext } from 'react';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { selectedCity, dispatch, deleteCity } = useContext(CitiesContext);

  const { cityName, emoji, date, id, position } = city;

  function handelDelete(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li onClick={() => dispatch({ type: 'SET_SELECTED_CITY', payload: id })}>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          selectedCity === id ? styles['cityItem--active'] : ''
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => handelDelete(e)}>
          &times;
        </button>
      </Link>
    </li>
  );
}
