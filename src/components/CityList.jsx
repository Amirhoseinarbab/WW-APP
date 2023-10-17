import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

import { CitiesContext } from "../App";
import { useContext } from "react";

function CityList() {
  const { cities, isLoading } = useContext(CitiesContext);
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message={"    Nothing Added To The List..."} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
