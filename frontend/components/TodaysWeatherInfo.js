import React from "react";
import tailwind from "tailwind-rn";
import { Text, Layout } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
export default TodaysWeatherInfo = ({ forecast }) => {
  // Capitalize first character

  const weather = forecast ? forecast.forecastCategory: "";
  let weatherText = forecast ? weatherConditions[weather].text : "";
  const date = moment().format('DD MMM');
  const highTemp = forecast?  forecast.highTemp: "";
  const lowTemp = forecast? forecast.lowTemp: "";

  
  return (
    <Layout
      style={tailwind(
        "flex-row justify-center items-center border rounded-2xl mx-8 my-2 py-1"
      )}
    >
    
    <Layout style={tailwind("flex-col items-center ")} > 
    <Text style={tailwind("font-bold")}> {date} </Text>
    </Layout>
    <Layout style={tailwind("flex-col items-center ")} > 
      <MaterialCommunityIcons
        size={50}
        name={forecast ? weatherConditions[weather].icon : ""}
        color={forecast ? weatherConditions[weather].color : ""}
      />
      <Text style={tailwind("font-bold")} > {weatherText} </Text> 
     </Layout>
      <Layout>     
        <Layout style={tailwind("flex-row")} > 
          <FontAwesome5
          style={tailwind("pb-1")}
          name="temperature-high"
          size={20}
          color="red"
          />
          <Text  style={tailwind("font-bold")} > {highTemp} °C </Text> 
        </Layout>
        <Layout style={tailwind("flex-row")}> 
          <FontAwesome5
          style={tailwind("pb-1")}
          name="temperature-low"
          size={20}
          color="blue"
        />
          <Text style={tailwind("font-bold")} > {lowTemp} °C </Text> 
        </Layout>
      </Layout>
    </Layout>
  );
};