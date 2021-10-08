import React, { useContext } from 'react';
import { StyleSheet, View, Text, Alert, TouchableWithoutFeedback,Keyboard} from 'react-native';

import { Button, Input  } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import AppContext from './database.js';

import { globalStyles } from '../global.js';

export default function SetReps({ route }) {

  const myContext = useContext(AppContext);

  const navigation = useNavigation();
  const activity = route.params.title;
  const checkedVal = route.params.checked;

  const alertHandler = () => {
    Alert.alert("Error!", "Value cannot be less than zero.", [{'text': 'Understood', style: "cancel"}]);
  }

  const pressHandler = () => {
    if (reps <= 0 || sets <= 0){
      alertHandler();
    }
    else{
      myContext.setActivity([...myContext.activityname, {title: activity, checked: checkedVal, description: 'Reps: ' + reps + ' Sets: ' + sets}]);
      navigation.navigate('HOME');
    }
  }
  

  const [reps, setReps] = React.useState('');
  const [sets, setSets] = React.useState('');

  return(
    <TouchableWithoutFeedback onPress = { () => {Keyboard.dismiss();}}> 
    <View style = {globalStyles.container}>
      <Text style = {globalStyles.titleText}> For {route.params.title}, please enter the following! </Text>
      
      <Text style = {styles.titleText}> Number of Reps </Text>
        <Input
          keyboardType = 'numeric'
          placeholder='e.g. 10'
          value={reps}
          onChangeText={nextValue => setReps(nextValue)}
        />

      <Text style = {styles.titleText}> Number of Sets </Text>
        <Input
          keyboardType = 'numeric'
          placeholder='e.g. 3'
          value={sets}
          onChangeText={nextValue => setSets(nextValue)}
        />
        
      <Button 
        accessoryLeft = {<MaterialCommunityIcons size={20} name= 'plus-circle-outline' color="white" />}
        styles={styles.button} 
        onPress={pressHandler}>
        Add Activity
      </Button>

    </View> 
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  titleText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 20,
  }
})