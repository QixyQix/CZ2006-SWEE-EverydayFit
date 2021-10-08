import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import {DisplayDate} from '../Components/dateWeather';
import WeatherInfoOfTheDay from '../Components/todaysWeather';
import FitnessPlanner from '../Components/fitnessPlan';

console.log("hello");
export default function HomeScreen() {

  const navigation = useNavigation();

  return (
        null
    )
}
