import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import FitnessPlanner from '../Components/fitnessPlan';

export default function FitnessPlanScreen({route}) {

  const navigation = useNavigation();

  return (

        <View>

          <View style={styles.dateBar}>
            <Text style={styles.dayPLanText} > Fitness plan for {route.params.select_date.substring(0, 10)}</Text>
          </View>

          <View style = {styles.fitnessPLanView} > 
          <FitnessPlanner />
          </View>

        </View>
      
    )
}

const styles = StyleSheet.create({
  fitnessPLanView:{
    marginTop: 90,
    justifyContent: 'center',
    alignContent: 'center'

  },
  
  dayPLanText: {

    fontWeight: 'bold',
    fontSize: 20,

  },

  dateBar: {

    marginTop: 50,
    marginHorizontal: 85,
    position: 'absolute', 
    alignContent: 'center',
    justifyContent: 'center',
 
  },

});
