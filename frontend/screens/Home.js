
import React, {useState, useEffect} from "react";
import TodaysWeatherInfo from "../components/TodaysWeatherInfo";
import FitnessPlanner from "../components/FitnessPlanner";
import tailwind from "tailwind-rn";
import { useAuth } from "../utils/auth";
import { Layout } from "@ui-kitten/components";
import HomeHeader from "../components/HomeHeader";
import {API_URL} from "@env";
import axios from "axios";
import moment from 'moment'; 
import { useNavigation } from "@react-navigation/native";

export default Home = () => {
const { getPlan, setPlan, deletePlan } = useAuth();
const navigation = useNavigation();
const [count, setCount] = useState(0);
moment.locale();
  


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

//deletePlan('2021-11-01');
// deletePlan("2021-11-05", "aa");
// getPlan('2021-11-05').then((data) => console.log(data));
//setPlan('2021-10-30').then((data) => console.log(data));

  const date = new Date(); 
  //{year: moment(forecast.date.toString()).format('YYYY'), month: moment(forecast.date.toString()).format('MM'), date: moment(forecast.date.toString()).format('DD'), day: moment(forecast.date.toString()).format("ddd MMM DD YYYY")})}
  const dateStuff = {year: moment().local().format('YYYY'), month: moment().local().format('MM'), date: moment().local().format('DD'), day: moment().local().format("ddd MMM DD YYYY")};
  console.log(dateStuff);
  return (
    <Layout style={tailwind("flex-1")}>
      <HomeHeader forecast = {forecasts}/>
      <TodaysWeatherInfo forecast = {forecasts[0]}/>
      <FitnessPlanner date = {dateStuff}/>
    </Layout>
  );
};