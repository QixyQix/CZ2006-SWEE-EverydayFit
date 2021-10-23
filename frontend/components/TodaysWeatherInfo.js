import React from "react";
import tailwind from "tailwind-rn";
import { Text, Layout } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../constants";
import moment from "moment";

export default TodaysWeatherInfo = ({ forecast }) => {
  // Capitalize first character
  
  const weather = forecast ? forecast.forecastCategory: "";
  const weatherText = forecast ? weather[0].toUpperCase() + weather.substring(1) : "";
  const date = forecast ? moment(forecast.date.toString()).format('MMM D') : "";

  return (
    <Layout
      style={tailwind(
        "flex-row justify-center items-center border rounded-2xl mx-8 my-2 py-1"
      )}
    >
      <Text> {date} </Text>
      <MaterialCommunityIcons
        size={50}
        name={forecast ? weatherConditions[weather].icon : ""}
        color={forecast ? weatherConditions[weather].color : ""}
      />
      <Text> {weatherText} </Text> 
      
      {/* <Text> {temperature} </Text> */}
    </Layout>
  );
};
