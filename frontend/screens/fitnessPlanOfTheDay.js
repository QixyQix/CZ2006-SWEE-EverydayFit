import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import FitnessPlanner from '../Components/fitnessPlan';

export default function FitnessPlanScreen({route}) {

  const navigation = useNavigation();

  return (
    <>
      <View styles={styles.container}>

        <View styles={styles.container}>

          <View style={styles.dateBar}>
            <Text> FITNESS PLAN OF THE DAY {route.params.select_date.substring(0, 10)}</Text>

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
  fitnessPLanView:{
    marginTop: 45,
    justifyContent: 'center',
    alignContent: 'center'

  },
  container: {

    justifyContent: 'center',
    alignContent: 'center'

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
    marginTop: 30,
    position: 'absolute', 
    alignContent: 'center',
 
  },

});
