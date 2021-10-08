import React from 'react';
import { Text } from '@ui-kitten/components';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, TouchableOpacity} from 'react-native';

export const WeatherInfoOfTheDay = ({date, weather, temperature}) => {

    const day = {date}.date
    const temp = {temperature}.temperature
    const weath = {weather}.weather

    if ({weather}.weather == 'Sunny'){
      return ( 
        
            <View style = {styles.dayInfo}> 
                <Text > {day} </Text>
                <MaterialCommunityIcons size={50} name= 'weather-sunny' color="#f7b733" />
                <Text > {weath} </Text>
                <Text > {temp} </Text>
            </View>

    );
    }
    else if ({weather}.weather == 'Cloudy'){
      return ( 
            <View style = {styles.dayInfo}> 
                <Text > {day} </Text>
                <MaterialCommunityIcons size={35} name= 'weather-cloudy' color='#1F1C2C' />
                <Text > {weath} </Text>
                <Text > {temp} </Text>
            </View>
    );
    }
    else if ({weather}.weather == 'Rainy'){
      return ( 
            <View style = {styles.dayInfo}> 
            <Text > {day} </Text>
                <MaterialCommunityIcons size={35} name= 'weather-rainy' color='#005BEA' />
                <Text > {weath} </Text>
                <Text > {temp} </Text>
            </View>
    );
    }
    else if ({weather}.weather == 'Stormy'){
      return ( 
            <View style = {styles.dayInfo}> 
            <Text > {day} </Text>
                <MaterialCommunityIcons size={35} name= 'weather-lightning' color='#616161' />
                <Text > {weath} </Text>
                <Text > {temp} </Text>
            </View>
      )
    };
  };
  
const styles = StyleSheet.create({      
  
      navigateText: {
          fontWeight: 'bold',
          fontSize: 15,
          flex: 1,
    
      },
  
      task: {
          padding: 18,
          flex: 1,
     
      },

      dayInfo: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        position: 'absolute',
        borderWidth: 1,
        width: 275,
        height: 55,
        borderRadius: 15, 
      
    },
});
  
export default WeatherInfoOfTheDay;