import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

import Register from "./screens/Register";
import Login from "./screens/Login";
import Bmi from "./screens/Bmi";
import Ippt from "./screens/Ippt";
import Startup from "./screens/Startup";

import HomeScreen from "./screens/Home";
import FitnessPlanScreen from "./screens/fitnessPlanOfTheDay";
import MyCalendar from "./Components/calendar";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Startup" component={Startup} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="FITNESS_PLAN" component={FitnessPlanScreen} />
    <Stack.Screen name="CALENDAR" component={MyCalendar} />
  </Stack.Navigator>
);

// TODO Create tab icons (NOTE: no icons for Bmi and Ippt in Eva Icons, might need to import 3rd party icons)

const HomeIcon = (props) => <Icon {...props} name="home" />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="BMI" />
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="IPPT" />
  </BottomNavigation>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
  >
    <Tab.Screen name="Bmi" component={Bmi} />
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Ippt" component={Ippt} />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <BottomTabNavigator />
  </NavigationContainer>
);
