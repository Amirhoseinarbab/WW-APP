/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useContext, useEffect, useState } from "react";

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";
import { CitiesContext } from "../App";
import City from "./City";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";




export default function Map() {
  const [position, setPosition] = useState([40, 0]);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const {
    isLoading: isLoadingPosition ,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  
  
  const { cities } = useContext(CitiesContext);
  useEffect(() => {
    if(lat && lng) setPosition( [lat, lng]);
  }, [lat,lng]);

  useEffect(()=>{
    if (geolocationPosition){setPosition([geolocationPosition.lat, geolocationPosition.lng]);setSearchParams({lat:geolocationPosition.lat , lng:geolocationPosition.lng})}
   
  } ,[geolocationPosition,setSearchParams])
  
  return (
    <div className={styles.mapContainer} >
      {!geolocationPosition && <Button type="position" onClick={getPosition} >
          {isLoadingPosition  ? "Loading..." : "Use your position"}
        </Button>}
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.map}
        >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          // url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.notes}</Popup>
          </Marker>
        ))}
      <ChangeCenter position={position}/> 
      <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick (){

  const navigate = useNavigate()

  useMapEvent({
    // console.log(e)
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })

  return null
}

