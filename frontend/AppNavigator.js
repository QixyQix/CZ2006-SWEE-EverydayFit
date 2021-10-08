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
import FitnessPlanner from "./Components/fitnessPlan";
import AddActivity from "./Components/addActivity";
import SetReps from "./Components/setReps";

import {FontAwesome5} from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';


import Calculator from "./testIPPT/calculator";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// update
const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>

    <Stack.Screen name="Startup" component={Startup} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="HomeScrn" component={HomeScreen} />
    <Stack.Screen name="FITNESS_PLAN" component={FitnessPlanScreen} />
    <Stack.Screen name="CALENDAR" component={MyCalendar} />
    <Stack.Screen name="Fitness Plan" component={FitnessPlanner} />
    <Stack.Screen name="ADDACTIVITY" component= {AddActivity}/>
    <Stack.Screen name="SETREPS" component= {SetReps}/>

    
  </Stack.Navigator>
);

// TODO Create tab icons (NOTE: no icons for Bmi and Ippt in Eva Icons, might need to import 3rd party icons)

const HomeIcon = (props) => <MaterialIcons name = 'home' size = {30} color = 'rgb(0, 0, 230)' />;

const BMIIcon = (props) => <FontAwesome5 name = 'weight' size = {25} color = 'rgb(0, 0, 230)' />;

const IPPTIcon = (props) => <FontAwesome5 name = 'running' size = {25} color = 'rgb(0, 0, 230)' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="BMI" icon={BMIIcon}/>
    <BottomNavigationTab title="Home" icon={HomeIcon} />
    <BottomNavigationTab title="IPPT" icon={IPPTIcon}/>
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
