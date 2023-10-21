// import React from 'react'
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "./../components/Map";
import { useNavigate } from "react-router-dom";
import User from "../components/User";

export default function AppLayout() {
  const navigate = useNavigate();

  
    return (
      <div className={styles.app}>
        <User />
        <Sidebar />

        <Map onClick={() => navigate("form")} />
      </div>
    );
}
