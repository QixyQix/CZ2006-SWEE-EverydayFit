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
} from "@ui-kitten/components";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/auth";
import { getExercises } from "../utils/exercises";
import ButtonsStuff from "./ButtonsStuff";

export default FitnessPlanner = (props) => {

  const { getPlan, setPlan, deletePlan, patchPlan } = useAuth();
  const [ exercise, setExercise ] = useState([]);
  const [ activities, setActivities ] = useState([]);
  const [ visibleBtn, setVisibleBtn ] = useState(false);

  const [visibleBtnA, setVisibleBtnA] = useState(false);

  const navigation = useNavigation();
  var dictExercise = {};
  var dictActivity = {};
  var dictExerciseToID = {"Remain the same" : {exerciseID: "61741aa88ddc3fb8db166bc6"}};

  const getActivities = async () => {
    try{
      const data = await getPlan(`${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`)
      console.log('dingdong:', data);
      setActivities(data.activities);
    } catch (e) {
      console.log(e)
    }
  };

  const arrayInitialisation = () => {
      console.log('hello');
      setPlan(`${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`, {_id: "61741aa88ddc3fb8db166bcc", quantity: 1, sets: 1});
      getActivities();
      //console.log('hello', activities[0]._id);
      deletePlan(`${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`, activities[activities.length-1]._id);
  }

  if(activities.length !== 0 && exercise.length !== 0){
    //const theSize = exercise ? exercise.length : 0;
    const theSize = 8;
    for (var j = 0; j < theSize; j++){ 
      dictExercise[exercise[j]._id] = {name: exercise[j].name, exerciseType: exercise[j].quantityType, unitType: exercise[j].quantityUnit};
      dictExerciseToID[exercise[j].name] = {exerciseID: exercise[j]._id}
    }

    const sizeOfPlan = activities ? activities.length : 0;
    for (var j = 0; j < sizeOfPlan; j++) {
      dictActivity[activities[j].exerciseID] = [activities[j].totalQuantity, activities[j].sets, activities[j].done];
    }

  }

  const getLabelMsg = (item) => {
    // If one of activities or exercise is empty
    if (activities.length === 0 || exercise.length === 0 || Object.keys(dictExercise) === 0 || Object.keys(dictActivity) === 0) return "";
    
    const quantityDescription = dictExercise[item.exerciseID].exerciseType === "QUANTITATIVE"
                                ? `Reps: ${dictActivity[item.exerciseID][0]}`
                                : dictExercise[item.exerciseID].exerciseType === "TIME"
                                ? `Duration ${dictActivity[item.exerciseID][0]} ${dictExercise[item.exerciseID].unitType}`
                                : `Distance ${dictActivity[item.exerciseID][0]} ${dictExercise[item.exerciseID].unitType}`
    
    const setsDescription =   dictActivity[item.exerciseID][1] !== null && dictExercise[item.exerciseID].exerciseType !== "TIME" && dictExercise[item.exerciseID].exerciseType !== "DISTANCE"
                             ? " Sets: " + `${dictActivity[item.exerciseID][1]}`
                             : " "
    
   return (quantityDescription + setsDescription);
    
  }
  const getExercise = async () => {
      
      setExercise(await getExercises());
  
  };
    
  const getTitle= (item) => {
      //If one of activities or exercise is empty
      if (activities.length === 0 || exercise.length === 0 || Object.keys(dictExercise) === 0 ) return "";
      if(typeof(item.exerciseID) === 'undefined') removeHandler(item._id);
      return dictExercise[item.exerciseID].name;
      //return " ";
  }
  
  const removeHandler = (item) => {
    deletePlan(`${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`, item);
    getActivities();
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
        for(var j=1; j < 9; j++){
          exercisesArray[j] = exercise[j].name;
        }
        return exercisesArray;
      }
      return exercisesArray;
    }

          
    const switchState = (state, item) => {
      item.done = state;
      patchPlan(`${props.date.year}-${('0' + props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`, item)
      getActivities();
    };
    const renderItem = ({ item, index }) => (
      <Layout style={tailwind("flex-col")} level="1">
        <CheckBox
          style={tailwind("left-3")}
          checked={item.done}
          status="primary"
          onChange={(checknext) => switchState(checknext, item)}
        >
          <ListItem
           
            //disabled = {true}
            accessoryRight={() => 
               <ButtonsStuff 
                date = {`${props.date.year}-${props.date.month}-${props.date.date}`}
                placement = {AAplacements()}
                activityID = {item._id}
                getExercise = {getExercise}
                exercise = {exercise.slice(0,8)}
                activities = {activities}
                getActivities = {getActivities}
                dictExercise = {activities.length !== 0 && exercise.length !== 0 ? dictExercise : []}
                dictActivity = {activities.length !== 0 && exercise.length !== 0 ? dictActivity : []}
                dictExerciseToID = {activities.length !== 0 && exercise.length !== 0 ? dictExerciseToID : []} 
                exerciseName = {getTitle(item)}
                />}
              title={getTitle(item)}
              //{...console.log("EXERCISE TITLE:", getTitle(item))}
              description={getLabelMsg(item)}
            />
        </CheckBox>
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