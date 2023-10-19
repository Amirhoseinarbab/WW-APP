/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
//b1 comit
//1
//2
//3

import { useContext, useEffect, useState } from "react";

import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker, { setDefaultLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { CitiesContext } from "../App";
import { useNavigate } from "react-router-dom";

 function convertToEmoji(countryEmojiCode) {
  const codePoints = countryEmojiCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [countryEmoji, setCountryEmoji] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [lat, lng] = useUrlPosition();
  const navigate = useNavigate();

  const {setNewCity} = useContext(CitiesContext)

  useEffect(() => {
    // setError("")
    if (!lat || !lng) return;
    setLoading(true);
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    )
      .then((res) => res.json())

      .then((data) => {
        setError("");
        if (!data.city) {
          setError("That doesn't seem to be a city. Click somewhere else 😉");
        } else {
          setError("");
        }
        setCityName(data.city);
        setCountry(data.countryName);
        setCountryEmoji(convertToEmoji(data.countryCode));
        setLoading(false);
      })
      .catch((er) => {
        // throw new Error(er);
        setError(er);
      })
      .finally
      // console.log(loading),
      ();
  }, [lat, lng]);

  function handelSubmit(e) {
    e.preventDefault();

    setNotes("")

    const newCity = 
    {
      cityName,
      country,
      countryEmoji ,
      date ,
      notes,
      position: {
        lat ,
        lng 
      }
    }
    setNewCity(newCity)
    navigate("/app/cities")

  }

  if (loading) return <Spinner message={error} />;
  if (error) return <Message message={error} />;
  if (!lat && !lng)
    return <Message message="start by clicking some where on the map...💖" />;

  return (
    <form className={styles.form} onSubmit={handelSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          id="date"
          dateFormat="dd/mm/yyyy"

          // fixedHeight
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
