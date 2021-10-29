import React from 'react';
import tailwind from "tailwind-rn";
import {
  Datepicker, 
  Icon, 
  Layout, 
  Text,
  Button
} from "@ui-kitten/components";

import { useNavigation } from '@react-navigation/native';

const calendarIcon = (props) => (
  <Icon  name='calendar' {...props}/>
);

export const MyCalendar = () => {

  const [date, setDate] = React.useState(new Date());

  const navigation = useNavigation(); 
  return (
    <Layout style={tailwind("flex-grow items-center m-1")} >
      <Text style = {(tailwind("font-bold text-3xl"))}> Pick your date! </Text>
      <Datepicker
        label=' '
        caption=' '
        placeholder='Pick Date'
        date={date} 
        onSelect={nextDate => setDate(nextDate) }
        accessoryRight= {calendarIcon}

      />

      <Button style={tailwind("bg-blue-700 text-gray-800 font-bold py-3 px-1 rounded items-center")}  title="GO TO " onPress= {() =>  navigation.navigate('FITNESS_PLAN', {select_date: date.toDateString()})}>  
        <Text style={tailwind("text-base")}  >  Go to {date.toDateString()} </Text>
      </Button>

    </Layout>
  );
};

export default MyCalendar;