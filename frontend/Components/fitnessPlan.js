import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { globalStyles } from '../globalStuff/global';
import { Divider, List, ListItem, Button, CheckBox, Icon, SelectItem, Layout, Select, MenuItem, OverflowMenu, IndexPath} from '@ui-kitten/components';
import AppContext from './database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function FitnessPlanner(){

  const navigation = useNavigation();

  const myContext = useContext(AppContext);

  const alertHandler = (index) => {
    Alert.alert(
    "Confirm",
    "Are you sure you want to delete this activity?",
    [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteHandler(index) }
    ]
  );
} 
  
//  const [activity, setActivity] = useState([
//    {title: 'Push-up', checked: false}, 
//    {title: 'Sit-up', checked: false}, 
//    {title: 'Planks', checked: false},
//    {title: 'Push-up', checked: false}])
  

const renderItemAccessory = (index) => (
  <Button 
    style= {styles.editbutton}
    appearance='ghost' 
    accessoryRight = {<MaterialCommunityIcons size={20} name= 'delete' color="maroon" />}
    onPress={() => alertHandler(index)}>
  </Button>
  
);

 const switchState = (state, index) =>{
   let newArr = [...myContext.activityname];
   newArr[index]["checked"] = state;
   myContext.setActivity(newArr);
 }
 
 const pressHandler = () => {
    navigation.navigate('ADDACTIVITY');
}

const deleteHandler = (index) => {
  if (index !== -1){
    myContext.setActivity([...myContext.activityname.slice(0,index), ...myContext.activityname.slice(index+1)]);
  }
  
}

  const renderItem = ({ item, index }) => (
    <Layout style={styles.checkcontainer} level='1'>
      <CheckBox 
        style = {styles.checkbox}
        checked={item.checked}
        status='primary'
        onChange={checknext => switchState(checknext, index)}>
        <ListItem 
          //accessoryLeft = {renderItemIcon}
          accessoryRight = {renderItemAccessory(index)} 
          title={`${item.title}`}
          description={`${item.description}`}
        />
      </CheckBox>
    </Layout>
  );

  return (
      <View style = {styles.container2}>
          <List
          style={styles.container}
          data={myContext.activityname}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
          />
          <Button style={styles.button} 
         accessoryLeft = {<MaterialCommunityIcons size={21} name= 'pencil-plus' color="white" />}
          status='success' onPress={pressHandler}>
              Add Fitness Activity
          </Button>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 350,
 
  },
  container2: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 15,
    borderRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',

  },
  icon: {
    width: 32,
    height: 32,
  },
  buttonGroup: {
    margin: 1,
    
  },
  checkcontainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  checkbox: {
    left: 10,
    margin: 2,
    
  },
  editbutton: {
    left: 10,
  },
});