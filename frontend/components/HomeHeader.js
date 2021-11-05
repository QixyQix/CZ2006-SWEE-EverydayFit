import React from "react";
import tailwind from "tailwind-rn";
import DateWeatherButton from "./DateWeatherButton";
import { Layout, Text, Button, Card, Modal } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/auth";

export default HomeHeader = (props) => {

  return (
    <Layout style={tailwind("flex-row justify-around")}>
      <LogoutButton />
      <DateWeatherButton forecast={props.forecast[0]} />
      <DateWeatherButton forecast={props.forecast[1]} />
      <DateWeatherButton forecast={props.forecast[2]} />
      <DateWeatherButton forecast={props.forecast[3]} />
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
  const { logout } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const LogoutIcon = (props) => (
    <FontAwesome5
      style={tailwind("pb-1")}
      name="power-off"
      size={15}
      color="black"
    />
  );
  return (
    <Layout>
      <Button
        style={tailwind("bg-red-400")}
        accessoryLeft={LogoutIcon}
        onPress={() => setVisible(true)}
      >
        Logout
      </Button>
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text> Are you sure you want to logout </Text>
          <Layout style={tailwind("flex-row justify-center items-center ")}>
            <Button onPress={() => setVisible(false)}>No</Button>
            <Button
              onPress={async () => {
                await logout();
                setVisible(false);
              }}
            >
              Confirm
            </Button>
          </Layout>
        </Card>
      </Modal>
    </Layout>
  );
};