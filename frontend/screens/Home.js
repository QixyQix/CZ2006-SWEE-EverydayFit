import React from "react";
import { Layout } from "@ui-kitten/components";

import TodaysWeatherInfo from "../components/TodaysWeatherInfo";
import FitnessPlanner from "../components/FitnessPlanner";
import HomeHeader from "../components/HomeHeader";
import tailwind from "tailwind-rn";

export default Home = () => {
  return (
    <Layout style={tailwind("flex-1")}>
      <HomeHeader />
      <TodaysWeatherInfo
        date="Sept 1 2021"
        weather="rainy"
        temperature="32 celcius"
      />
      <FitnessPlanner />
    </Layout>
  );
};
