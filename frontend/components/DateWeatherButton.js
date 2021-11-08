import React from "react";
import tailwind from "tailwind-rn";
import { TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../constants";
import moment from "moment";
export default DateWeatherButton = ({ forecast }) => {

  const navigation = useNavigation();
  const weather = forecast ? forecast.forecastCategory: "";

  const date = forecast ? moment(forecast.date.substring(0, 10)).format('MMM D') : "";


  const dayFormat = forecast ? moment(forecast.date.substring(0, 10)).format('ddd MMM DD YYYY') : "";

  const dateYear = forecast ? moment(forecast.date.substring(0, 10)).format('YYYY') : "";

  return (
    <TouchableOpacity
      style={tailwind("items-center")}
      title="THE DATE"
      onPress={() => navigation.navigate("FITNESS_PLAN", {year: dateYear, month: moment(date).format('MM'), date: moment(date).format('DD'), day: dayFormat, weather : forecast ? forecast : ''})}
    >
      <MaterialCommunityIcons
        size={35}
        name={forecast ? weatherConditions[weather].icon : ""}
        color={forecast ? weatherConditions[weather].color : ""}
      />
      <Text style={tailwind("font-bold")}>{date}</Text>
    </TouchableOpacity>
  );
};