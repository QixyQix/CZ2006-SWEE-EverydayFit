import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Datepicker, Icon, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const calendarIcon = (props) => (
  <Icon  name='calendar' {...props}/>
);

const DayCell = ({ date }, style) => (

    <View style={[styles.dayContainer, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
    </View>

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

      <TouchableOpacity title="GO TO THE DATE CHOSEN" onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date.toDateString(),})}>  
        <Text> {date.toDateString()} </Text>
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
});

export default MyCalendar;