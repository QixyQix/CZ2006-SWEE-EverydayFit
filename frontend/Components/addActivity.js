import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, List, ListItem } from '@ui-kitten/components';
import AppContext from './database';
import { useNavigation } from '@react-navigation/native';

import { globalStyles } from '../globalStuff/global';

export default function AddActivity() {

  const myContext = useContext(AppContext);

  const navigation = useNavigation();
  
  const [activity, setActivity] = useState([
    {title: 'Running' , checked: false},
    {title: 'Jumping Jacks' , checked: false},
    {title: 'Push-up' , checked: false},
    {title: 'Burpees' , checked: false}
  ]);

  const renderItem = ({ item, index }) => (
      <ListItem onPress = {() => {navigation.navigate('SETREPS', item)}}
      title={`${item.title}`} 
      />
  );

  return (
    <View style = {globalStyles.container}>
        <List
        style={styles.container}
        data={activity}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  button: {
    margin: 2,
  },
});