import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Datepicker, Icon, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const calendarIcon = (props) => (
  <Icon  name='calendar' {...props}/>
);

export const MyCalendar = () => {

  const [date, setDate] = React.useState(new Date());

  const navigation = useNavigation(); 
  return (
    <Layout style={styles.container} level='1'>

      <Datepicker
        label='Label'
        caption='Caption'
        placeholder='Pick Date'
        date={date} 
        onSelect={nextDate => setDate(nextDate) }
        accessoryRight= {calendarIcon}

      />

      <TouchableOpacity style={styles.goToDate} title="GO TO " onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date.toDateString(),})}>  
        <Text style = {styles.goToDateText} >  Go to {date.toDateString()} </Text>
      </TouchableOpacity>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: 'red'
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },

  goToDate: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 100,
    backgroundColor: 'rgb(0, 0, 230)',
    height: 50,
    borderRadius: 30,

  },

  goToDateText: {

    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold'

  },

});

export default MyCalendar;