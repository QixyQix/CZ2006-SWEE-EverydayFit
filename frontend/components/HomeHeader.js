import React from "react";
import tailwind from "tailwind-rn";
import DateWeatherButton from "./DateWeatherButton";
import { Layout, Text, Button, Card, Modal } from "@ui-kitten/components";
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

  const [visible, setVisible] = React.useState(false);

  const LogoutIcon = (props) => (
    <FontAwesome5 style={tailwind("pb-1")} name = 'power-off' size = {15} color = 'black' />
  );

  return (
    
    <Layout>
      <Button style={tailwind("bg-red-400")}  accessoryLeft = { LogoutIcon  } onPress={() => setVisible(true)}>
        Logout
      </Button>
    
      <Modal visible={visible} >
        <Card disabled={true}  >
          <Text> Are you sure you want to logout </Text>
          <Layout style={tailwind("flex-row justify-center items-center ")}>
          <Button onPress={() => setVisible(false)}>
            No
          </Button>

          <Button onPress={() => setVisible(false)} onPress={ () => navigation.navigate('Startup')}>
            Confirm
          </Button>
          </Layout> 
        </Card>
      </Modal>

  </Layout>

  );
};
