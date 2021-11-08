import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import tailwind from "tailwind-rn";
import {
  Divider,
  List,
  ListItem,
  Button,
  CheckBox,
  Layout,
  Text,
} from "@ui-kitten/components";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/auth";
import { getExercises } from "../utils/exercises";
import ButtonsStuff from "./ButtonsStuff";
import { FontAwesome } from "@expo/vector-icons";

export default FitnessPlanner = (props) => {

  const { getPlan, setPlan, deletePlan, patchPlan } = useAuth();
  const [ exercise, setExercise ] = useState([]);
  const [ activities, setActivities ] = useState([]);

  const navigation = useNavigation();
  var dictExercise = {};
  var dictActivity = {};
  var dictQuantity = {};
  var dictExerciseToID = {"Remain the same" : {exerciseID: "6187da4fb5cccfeba574f855"}};
  var indoorExercises = [];
 
  const getActivities = async () => {
    try{
      const data = await getPlan(`${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`)
      setActivities(data.activities);
    } catch (e) {
      console.log(e)
    }
  };

  if(activities.length !== 0 && exercise.length !== 0){
    
    const theSize = 8;
    for (var j = 0; j < theSize; j++){ 
      dictExercise[exercise[j]._id] = {
        name: exercise[j].name, 
        exerciseType: exercise[j].quantityType, 
        unitType: exercise[j].quantityUnit, 
        caloriesBurnt: exercise[j].calorieBurnRatePerUnit, 
        outdoor: exercise[j].outdoorOnly
      };
      dictExerciseToID[exercise[j].name] = {exerciseID: exercise[j]._id}
      if(exercise[j].outdoorOnly !== true )
      {
        indoorExercises.push(exercise[j].name);
      }
    }

    const sizeOfPlan = activities ? activities.length : 0;
    for (var j = 0; j < sizeOfPlan; j++) {
      dictActivity[activities[j].exerciseID] = [activities[j].totalQuantity, activities[j].sets, activities[j].done];
    }

    const sizeOfPlan2 = activities ? activities.length : 0;
    for (var j = 0; j < sizeOfPlan2; j++) {
      dictQuantity[activities[j]._id] = [activities[j].totalQuantity, activities[j].sets, activities[j].done];
    }
  }

  const getLabelMsg = (item) => {

    if (activities.length === 0 || exercise.length === 0 || Object.keys(dictExercise) === 0 || Object.keys(dictActivity) === 0) return "";
    
    const quantityDescription = dictExercise[item.exerciseID].exerciseType === "QUANTITATIVE"
                                ? `Reps: ${dictQuantity[item._id][0]}`
                                : dictExercise[item.exerciseID].exerciseType === "TIME"
                                ? `Duration ${dictQuantity[item._id][0]} ${dictExercise[item.exerciseID].unitType}`
                                : `Distance ${dictQuantity[item._id][0]} ${dictExercise[item.exerciseID].unitType}`
    
    const setsDescription =  dictQuantity[item._id][1] !== null && dictExercise[item.exerciseID].exerciseType !== "TIME" && dictExercise[item.exerciseID].exerciseType !== "DISTANCE"
                             ? " Sets: " + `${dictQuantity[item._id][1]}`
                             : " "
    
   return (quantityDescription + setsDescription);
    
  }
  const getExercise = async () => {
      setExercise(await getExercises());
      
  };
  
  const getTitle= (item) => {

      if (activities.length === 0 || exercise.length === 0 || Object.keys(dictExercise) === 0 ) return "";
      if(typeof(item.exerciseID) === 'undefined') removeHandler(item._id);
      return dictExercise[item.exerciseID].name;

  }
  
  const removeHandler = async (item) => {
    await deletePlan(`${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`, item);
    await getActivities();
  }

  useFocusEffect(
      useCallback(() => {
        getActivities();
        getExercise();

      }, [])
  )

  const pressHandler = () => {
    navigation.navigate("AddActivity", props);
  };

    const AAplacements = () => {
      let exercisesArray = ['Remain the same'];
      if(activities.length !== 0 && exercise.length !== 0){
        for(var j = 1; j < exercise.length + 1; j++){
          exercisesArray[j] = exercise[j-1].name;
        }
        return exercisesArray;
      }
      return exercisesArray;
    }
  
          
  const switchState = async (state, item) => {

    item.done = state;
    await patchPlan(`${props.date.year}-${('0' + props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`, item)
    await getActivities();

  };

  const printRecommendedExercises = () => {
    
    var stringExercises = ""

    for (var i=0; i < indoorExercises.length; i++){
      if( i !== indoorExercises.length-1){
        stringExercises =  stringExercises + `${indoorExercises[i]},`
      } else {
        stringExercises = stringExercises + `${indoorExercises[i]}`
      }
    }

    return stringExercises;

  }


  const renderItem = ({ item, index }) => (

    <Layout style={tailwind("flex-col ")} level="1">
      <CheckBox
        style={tailwind("left-3")}
        checked={item.done}
        status="primary"
        onChange={(checknext) => switchState(checknext, item)}
      >
        
          <ListItem
          
            accessoryRight={() => 
              <ButtonsStuff 
                date = {`${props.date.year}-${('0' + props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`}
                placement = {activities.length !== 0 && exercise.length !== 0 ? AAplacements() : []}
                activityID = {item._id}
                getExercise = {getExercise}
                exercise = {exercise.slice(0,8)}
                activities = {activities}
                getActivities = {getActivities}
                dictExercise = {activities.length !== 0 && exercise.length !== 0 ? dictExercise : []}
                dictActivity = {activities.length !== 0 && exercise.length !== 0 ? dictActivity : []}
                dictExerciseToID = {activities.length !== 0 && exercise.length !== 0 ? dictExerciseToID : []} 
                dictQuantity = {activities.length !== 0 && exercise.length !== 0 ? dictQuantity : []}
                exerciseName = {getTitle(item)}
                exerciseID = {item.exerciseID}
              />}
            title={getTitle(item)}
            description={getLabelMsg(item)}
          />
          
      </CheckBox>

      <Layout style = {tailwind('flex-row items-center')}> 

      { activities.length !== 0 && exercise.length !==0 
        ? props.date.weather.wetWeather === true && dictExercise[item.exerciseID].outdoor === true 
          && <FontAwesome
            style={tailwind("flex-row items-center left-2 mr-2")}
            name="warning"
            size={20}
            color="red" /> 
        : <Text> </Text> }
  

      { activities.length !== 0 && exercise.length !==0 
        ? props.date.weather.wetWeather === true && dictExercise[item.exerciseID].outdoor === true 
            && <Text style = {tailwind('text-xs font-bold items-center left-3')}> 
              Alternative exercises: 
            {"\n"}
              {printRecommendedExercises()}
            </Text> 
        : <Text> </Text> }
        </Layout>
    </Layout>  
  );    

  return (
    <Layout style={tailwind("flex-grow flex-initial items-center m-1")}>

      <List 
        data={activities.length ? activities : null}
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