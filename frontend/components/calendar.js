import React, { useState, useCallback } from "react";
import { API_URL } from "@env";
import axios from "axios";
import tailwind from "tailwind-rn";
import moment from "moment";
import { Datepicker, Icon, Layout, Text, Button } from "@ui-kitten/components";

import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
const calendarIcon = (props) => <Icon name="calendar" {...props} />;

export const MyCalendar = () => {
  const [forecasts, setForecasts] = useState([]);

  const getForecasts = async () => {
    try {
      const res = await axios.get(`${API_URL}/forecasts`);
      setForecasts(res.data);
    } catch (e) {
      //setForecasts()
      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getForecasts();
    }, [])
  );

  const [date, setDate] = React.useState(new Date());
  const displayDate = () => {
    if (forecasts == null || forecasts.length < 4) {
      return "";
    }

    const date1 = forecasts.length !== 0 ? forecasts[0].date.slice(0, 10) : "";
    const date2 = forecasts.length !== 0 ? forecasts[1].date.slice(0, 10) : "";
    const date3 = forecasts.length !== 0 ? forecasts[2].date.slice(0, 10) : "";
    const date4 = forecasts.length !== 0 ? forecasts[3].date.slice(0, 10) : "";

    const dateGotten = date
      ? `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
          "0" + date.getDate()
        ).slice(-2)}`
      : "";

    if (date1 == dateGotten) {
      const weather = forecasts[0] ? forecasts[0].forecastCategory : "";
      return forecasts[0];
    } else if (date2 == dateGotten) {
      const weather = forecasts[1] ? forecasts[1].forecastCategory : "";

      return forecasts[1];
    } else if (date3 == dateGotten) {
      const weather = forecasts[2] ? forecasts[2].forecastCategory : "";

      return forecasts[2];
    } else if (date4 == dateGotten) {
      const weather = forecasts[3] ? forecasts[3].forecastCategory : "";

      return forecasts[3];
    }

    return "";
  };
  displayDate();

  const navigation = useNavigation();
  return (
    <Layout style={tailwind("flex-grow items-center m-1")}>
      <Text style={tailwind("font-bold text-3xl")}> Pick your date! </Text>
      <Datepicker
        label=" "
        caption=" "
        placeholder="Pick Date"
        date={date}
        onSelect={(nextDate) => setDate(nextDate)}
        accessoryRight={calendarIcon}
      />

      <Button
        style={tailwind(
          "bg-blue-700 text-gray-800 font-bold py-3 px-1 rounded items-center"
        )}
        title="GO TO "
        onPress={() =>
          navigation.navigate("FITNESS_PLAN", {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            day: date.toDateString(),
            weather: displayDate() ? displayDate() : "",
          })
        }
      >
        <Text style={tailwind("text-base")}> Go to {date.toDateString()} </Text>
      </Button>
    </Layout>
  );
};

export default MyCalendar;
