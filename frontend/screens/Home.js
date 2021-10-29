
import React, {useState, useEffect} from "react";
import TodaysWeatherInfo from "../components/TodaysWeatherInfo";
import FitnessPlanner from "../components/FitnessPlanner";
import tailwind from "tailwind-rn";
import { useAuth } from "../utils/auth";
import { Layout } from "@ui-kitten/components";
import HomeHeader from "../components/HomeHeader";
import {API_URL} from "@env";
import axios from "axios";

export default Home = () => {
const { getPlan, setPlan, deletePlan } = useAuth();

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

//getPlan().then((data) => console.log(data));
//setPlan('2021-10-30').then((data) => console.log(data));
//deletePlan('2021-10-30').then((data) => console.log(data));

  return (
    <Layout style={tailwind("flex-1")}>
      <HomeHeader forecast = {forecasts}/>
      <TodaysWeatherInfo forecast = {forecasts[0]}/>
      <FitnessPlanner />
    </Layout>
  );
};