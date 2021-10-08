import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { Icon, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const calendarIcon = (props) => (
  <Icon  name = 'calendar' {...props}/>
);
  
export const weatherConditions = {
    Rain: {
      color: '#005BEA',
      title: 'Raining',
      icon: 'weather-rainy'
    },
    Sunny: {
      color: '#f7b733',
      title: 'So Sunny',
      icon: 'weather-sunny'
    },
    Thunderstorm: {
      color: '#616161',
      title: 'A Storm is coming',
      icon: 'weather-lightning'
    },
    Clouds: {
      color: '#1F1C2C',
      title: 'Clouds',
      icon: 'weather-cloudy'
    },
}

export const DisplayDate = ({date, weather}) => {

  const navigation = useNavigation(); 

  if ({weather}.weather == 'Sunny'){
    return ( 
      <TouchableOpacity style = {styles.task} title="THE DATE" onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date,})}> 
          <View style = {    justifyContent = 'center', alignItems = 'center'}> 
          <MaterialCommunityIcons size={35} name= 'weather-sunny' color="#f7b733" />
          <Text style = {styles.navigateText} > {date} </Text>
          </View>
      </TouchableOpacity>
  );
  }
  else if ({weather}.weather == 'Cloudy'){
    return ( 
      <TouchableOpacity style = {styles.task} title="THE DATE" onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date,})}> 
          <View style = {    justifyContent = 'center', alignItems = 'center'}> 
          <MaterialCommunityIcons size={35} name= 'weather-cloudy' color='#1F1C2C' />
          <Text style = {styles.navigateText} > {date} </Text>
          </View>
      </TouchableOpacity>
  );
  }
  else if ({weather}.weather == 'Rainy'){
    return ( 
      <TouchableOpacity style = {styles.task} title="THE DATE" onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date,})}>  
          <View style = {    justifyContent = 'center', alignItems = 'center'}> 
          <MaterialCommunityIcons size={35} name= 'weather-rainy' color='#005BEA' />
          <Text style = {styles.navigateText} > {date} </Text>
          </View>
      </TouchableOpacity>
  );
  }
  else if ({weather}.weather == 'Stormy'){
    return ( 
      <TouchableOpacity style = {styles.task} title="THE DATE" onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date,})}>  
          <View style = {    justifyContent = 'center', alignItems = 'center'}> 
          <MaterialCommunityIcons size={35} name= 'weather-lightning' color='#616161' />
          <Text style = {styles.navigateText} > {date} </Text>
          </View>
      </TouchableOpacity>
  );
  }
};


const styles = StyleSheet.create({      

    navigateText: {
        fontWeight: 'bold',
        fontSize: 12,
        flex: 1,
  
    },

    task: {
        padding: 18,
        flex: 1,
    }
});


export default DisplayDate;