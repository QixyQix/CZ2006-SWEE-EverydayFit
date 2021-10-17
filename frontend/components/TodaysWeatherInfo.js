import React from "react";
import tailwind from "tailwind-rn";
import { Text, Layout } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../constants";

export default TodaysWeatherInfo = ({ date, weather, temperature }) => {
  // Capitalize first character
  const weatherText = weather[0].toUpperCase() + weather.substring(1);

  return (
    <Layout
      style={tailwind(
        "flex-row justify-center items-center border rounded-2xl mx-8 my-2 py-1"
      )}
    >
      <Text> {date} </Text>
      <MaterialCommunityIcons
        size={50}
        name={weatherConditions[weather].icon}
        color={weatherConditions[weather].color}
      />
      <Text> {weatherText} </Text>
      <Text> {temperature} </Text>
    </Layout>
  );
};
