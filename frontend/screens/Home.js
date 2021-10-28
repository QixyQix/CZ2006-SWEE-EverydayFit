import React, {useState, useEffect} from "react";
import { Layout } from "@ui-kitten/components";

import TodaysWeatherInfo from "../components/TodaysWeatherInfo";
import FitnessPlanner from "../components/FitnessPlanner";
import HomeHeader from "../components/HomeHeader";
import tailwind from "tailwind-rn";
import {API_URL} from "@env";
import axios from "axios";

export default Home = () => {
  const [forecasts, setForecasts] = useState([]);

  const getForecasts = async () => {
    try{
      const res = await axios.get(`${API_URL}/forecasts`);
      setForecasts(res.data);
    } catch {
      //setForecasts()
    }
    
  };

  useEffect(() => {
    getForecasts();
    }, []);

  return (
    <Layout style={tailwind("flex-1")}>
      <HomeHeader forecast = {forecasts}/>
      <TodaysWeatherInfo forecast = {forecasts[0]}/>
      <FitnessPlanner />
    </Layout>
  );
};
