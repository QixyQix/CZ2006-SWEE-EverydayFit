
import {useState, useEffect} from "react";
import React, { useEffect } from "react";
import tailwind from "tailwind-rn";
import { useAuth } from "../utils/auth";


export default Home = () => {
const { getPlan, setPlan, deletePlan } = useAuth();

console.log("hi")
//getPlan().then((data) => console.log(data));
//setPlan('2021-10-30').then((data) => console.log(data));
//getPlan().then((data) => console.log(data));

deletePlan('2021-10-30').then((data) => console.log(data));
getPlan().then((data) => console.log(data));
console.log("bye");

  return (
    <Layout style={tailwind("flex-1")}>
      <HomeHeader forecast = {forecasts}/>
      <TodaysWeatherInfo forecast = {forecasts[0]}/>
      <FitnessPlanner />
    </Layout>
  );
};