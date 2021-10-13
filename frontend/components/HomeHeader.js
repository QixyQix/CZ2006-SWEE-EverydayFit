import React from "react";
import tailwind from "tailwind-rn";
import DateWeatherButton from "./DateWeatherButton";
import { Layout, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default HomeHeader = () => {
  return (
    <Layout style={tailwind("flex-row justify-around")}>
      <LogoutButton/>
      <DateWeatherButton date="Sept 1" weather="sunny" />
      <DateWeatherButton date="Sept 2" weather="cloudy" />
      <DateWeatherButton date="Sept 3" weather="rainy" />
      <DateWeatherButton date="Sept 4" weather="stormy" />
      <CalendarButton />
    </Layout>
  );
};

const CalendarButton = () => {
  const navigation = useNavigation();

  return (

    <TouchableOpacity
      style={tailwind("items-center")}
      onPress={() => navigation.navigate("CALENDAR")}
    >
      <FontAwesome5
        style={tailwind("pb-1")}
        name="calendar"
        size={30}
        color="red"
      />
      <Text style={tailwind("font-bold")}>Calendar</Text>
    </TouchableOpacity>

    
  );
};

const LogoutButton = () => {
  const navigation = useNavigation();

  return (
    
    <TouchableOpacity 
      style={tailwind("items-center")}
      onPress= {() =>  navigation.navigate('Startup')}
    >  
    <FontAwesome5 
      style={tailwind("pb-1")}
      name = 'power-off' 
      size = {25} 
      color = 'black' 
    />   
     <Text style={tailwind("font-bold")} > Logout </Text>
    </TouchableOpacity>

  );
};
