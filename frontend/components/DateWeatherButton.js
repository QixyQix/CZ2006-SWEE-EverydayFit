import React from "react";
import tailwind from "tailwind-rn";
import { TouchableOpacity } from "react-native";
import { Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { weatherConditions } from "../constants";

export default DateWeatherButton = ({ date, weather }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={tailwind("items-center")}
      title="THE DATE"
      onPress={() => navigation.navigate("FITNESS_PLAN", { select_date: date })}
    >
      <MaterialCommunityIcons
        size={35}
        name={weatherConditions[weather].icon}
        color={weatherConditions[weather].color}
      />
      <Text style={tailwind("font-bold")}>{date}</Text>
    </TouchableOpacity>
  );
};
