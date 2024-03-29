import React, { useState, useCallback } from "react";
import { Layout } from "@ui-kitten/components";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";
import TodaysWeatherInfo from "../components/TodaysWeatherInfo";
import FitnessPlanner from "../components/FitnessPlanner";
import tailwind from "tailwind-rn";
import HomeHeader from "../components/HomeHeader";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../utils/auth";

export default Home = () => {
  const [forecasts, setForecasts] = useState([]);

  const getForecasts = async () => {
    try {
      const res = await axios.get(`${API_URL}/forecasts`);
      setForecasts(res.data);
    } catch {
      //setForecasts()
    }
  };

  useFocusEffect(
    useCallback(() => {
      getForecasts();
    }, [])
  );

  const dateStuff = {
    year: moment().format("YYYY"),
    month: moment().format("MM"),
    date: moment().format("DD"),
    day: moment().format("ddd MMM DD YYYY"),
    weather: forecasts.length !== 0 ? forecasts[0] : "failed",
  };

  return (
    <Layout style={tailwind("flex-1 ")}>
      <HomeHeader forecast={forecasts} />
      <TodaysWeatherInfo forecast={forecasts[0]} />
      <FitnessPlanner date={dateStuff} />
    </Layout>
  );
};
