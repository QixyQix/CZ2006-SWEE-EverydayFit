import React, { useContext, useState, useEffect } from "react";
import tailwind from "tailwind-rn";
import {
  Divider,
  List,
  ListItem,
  Button,
  CheckBox,
  Layout,
} from "@ui-kitten/components";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EditButton from "./EditButton";
import { useAuth } from "../utils/auth";
import moment from "moment";
import { getExercises } from "../utils/exercises";

export default FitnessPlanner = (props) => {

  const { getPlan, setPlan, deletePlan } = useAuth();
  const { database, setDatabase } = useState([]);
  const [exercise, setExercise] = useState([]);
  const [activity, setActivity] = useState([]);
  
  const getExercise = async () => {
    try{
      getPlan(`${props.date.year}-${('0' + props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`).then((data) => {
        const exerciseRes = data;
        setExercise(exerciseRes.activities);
      } );
      // dd

    } catch {
      //dd
    }

  };
  
  
  const labelMsg = (exerciseID) => {
    return (!activity.length && !exercise.exerciseID ? 0 : dictActivity[exerciseID].exerciseType === "QUANTITATIVE"
            ? `Reps: ${dictExercise[exerciseID][0]}`
            : dictActivity[exerciseID].exerciseType === "TIME"
            ? `Duration ${dictExercise[exerciseID][0]} ${dictActivity[exerciseID].unitType}`
            : `Distance ${dictExercise[exerciseID][0]} ${dictActivity[exerciseID].unitType}`)
  }

    const getActivities = async () => {
      setActivity(await getExercises());
    };
    
    useEffect(() => {
      getExercise();
      getActivities();
      }, []);
      
    console.log("this are exe",exercise);
    //console.log(`${('0'+'30').slice(-2)}`);
    //console.log("this is it", activity);
 
    const theSize = activity ? activity.length : 0;
    var dictActivity = {};
    for (var j = 0; j < theSize; j++){
      dictActivity[activity[j]._id] = {name: activity[j].name, exerciseType: activity[j].quantityType, unitType: activity[j].quantityUnit};
    }

    //index 0 of array is quantity(reps) of exercises planned
    // index 1 of array is number of sets of exercises planned
    const sizeOfPlan = exercise ? exercise.length : 0;
    var dictExercise = {};
    for (var j = 0; j < sizeOfPlan; j++){
      dictExercise[exercise[j].exerciseID] = [exercise[j].totalQuantity, exercise[j].sets];
    }

    // to initialise the array on the server
    

    const navigation = useNavigation();

    const itemToParse = (itemID) => {
      const dateToPassIn =`${props.date.year}-${props.date.month}-${props.date.date}`
      const objToPassIn = { date: dateToPassIn, exerciseInfo: itemID};
      return objToPassIn;
    }

    const pressHandler = () => {
        navigation.navigate("AddActivity", props);
    };
  
    const renderItem = ({ item, index }) => (
      <Layout style={tailwind("flex-col")} level="1">
        <CheckBox
          style={tailwind("left-3")}
          checked={item.done}
          status="primary"
          onChange={(checknext) => switchState(checknext, index)}
        >
          <ListItem
            accessoryRight={<EditButton activityID={itemToParse(item._id)} />}
             title= {exercise.length && activity.length ? dictActivity[item.exerciseID]['name'] : null}
             description= {!exercise.exerciseID && !activity.length ? null : dictExercise[item.exerciseID][1] != null 
             ? labelMsg(item.exerciseID) + " Sets: " + `${dictExercise[item.exerciseID][1]}`
             : labelMsg(item.exerciseID)} 
          />
        </CheckBox>
      </Layout>
    );

  return (
    <Layout style={tailwind("flex-grow flex-initial items-center m-1")}>
      <List
        data={activity.length ? exercise : null}
        ItemSeparatorComponent={Divider}
        renderItem = {renderItem}   />
      <Button
        style={tailwind("mx-20")}
        accessoryLeft={
          <Feather size={21} name="plus-circle" color="white" />
        }
        status="success"
        onPress={pressHandler}
      >
        Add Fitness Activity
      </Button>
    </Layout>
  );
};
