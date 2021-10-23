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
  const date = forecast ? moment(forecast.date.toString()).format('MMM D') : "";

  return (
    <TouchableOpacity
      style={tailwind("items-center")}
      title="THE DATE"
      onPress={() => navigation.navigate("FITNESS_PLAN", { select_date: date })}
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
