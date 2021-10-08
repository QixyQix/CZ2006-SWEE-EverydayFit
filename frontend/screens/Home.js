import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import {DisplayDate} from '../Components/dateWeather';
import WeatherInfoOfTheDay from '../Components/todaysWeather';
import FitnessPlanner from '../Components/fitnessPlan';

export default function HomeScreen() {

  const navigation = useNavigation();

  return (
    <>
      <View styles={styles.container}>

        <View styles={styles.container}>


          <View style={styles.dateBar}>
          
              <DisplayDate date = 'Sept 1' weather = 'Sunny' />
              <DisplayDate date = 'Sept 2' weather = 'Cloudy' />
              <DisplayDate date = 'Sept 3' weather = 'Rainy' />
              <DisplayDate date = 'Sept 4' weather = 'Stormy' />
  
              <TouchableOpacity style = {styles.task} onPress= {() =>  navigation.navigate('CALENDAR')}>  
                <FontAwesome5 name = 'calendar' size = {30} color = 'red' />   
                  <Text style = {styles.calendarText} > Calendar </Text>
              </TouchableOpacity>
              
          </View>

          <View style = {styles.todayInfo}> 
              <WeatherInfoOfTheDay date = 'Sept 1 2021' weather = 'Rainy' temperature = '32 celcius'/>
          </View>

          <View  style = {styles.fitnessView}> 
            <Text style = {styles.fitnessText} > FITNESS PLAN OF THE DAY </Text>
          </View>

          <View style = {styles.fitnessPLanView} > 
          
          <FitnessPlanner />
          </View>

        </View>


      </View>
      
    </>
    )

}

const styles = StyleSheet.create({
  fitnessText:{
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
  },

  fitnessView:{
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 70,
    marginTop: 35

  },

  fitnessPLanView:{
    marginTop: 10,
    justifyContent: "center",
    
    alignContent: "center",
  },

  container: {
    justifyContent: "center",
    alignContent: "center"
  },

  calendarText: {
    fontWeight: 'bold',
    fontSize: 12,
    flex: 1, 
    textAlign: 'center',
  },

  task: {
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',

  },

  dateBar: {
    
    flexDirection: 'row',
    flex: 1,
    position: 'absolute', 
    alignContent: 'center',
 
  },

  todayInfo: {
  
    marginTop: 110,
    alignItems: 'center',
    justifyContent: 'center',
 
  },

});
