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
  ButtonGroup, 
  Icon,
  Modal,
  Card,
  Text,
  IndexPath, Select, SelectItem,
} from "@ui-kitten/components";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/auth";
import { getExercises } from "../utils/exercises";
import ButtonsStuff from "./ButtonsStuff";

export default FitnessPlanner = (props) => {

  const { getPlan, setPlan, deletePlan, patchPlan } = useAuth();
  const  [exercise, setExercise ] = useState([]);
  const [ activities, setActivities ] = useState([]);
  const [visibleBtn, setVisibleBtn] = useState(false);

  const [visibleBtnA, setVisibleBtnA] = useState(false);

  const navigation = useNavigation();
  var dictExercise = {};
  var dictActivity = {};
  var dictExerciseToID = {'Remain the same': {exerciseID: ''}};

  const getActivities = async () => {
    try{
      const data = await getPlan(`${props.date.year}-${(props.date.month)}-${(props.date.date)}`)
      console.log("HELP ME", data )
      setActivities(data.activities);
    } catch (e) {
      console.log(e)
    }
  };
  if(activities.length !== 0 && exercise.length !== 0){
    const theSize = exercise ? exercise.length : 0;
    for (var j = 0; j < theSize; j++){ 
      dictExercise[exercise[j]._id] = {name: exercise[j].name, exerciseType: exercise[j].quantityType, unitType: exercise[j].quantityUnit};
      dictExerciseToID[exercise[j].name] = {exerciseID: exercise[j]._id}
    }

    const sizeOfPlan = activities ? activities.length : 0;
    for (var j = 0; j < sizeOfPlan; j++) {
      dictActivity[activities[j].exerciseID] = [activities[j].totalQuantity, activities[j].sets];
    }

  }

  const getLabelMsg = (item) => {
    // If one of activities or exercise is empty
    if (activities.length === 0 || exercise.length === 0 || Object.keys(dictExercise) === 0 || Object.keys(dictActivity) === 0) return "";
    // console.log(item.exerciseID, dictExercise[item.exerciseId]);
    const quantityDescription = dictExercise[item.exerciseID].exerciseType === "QUANTITATIVE"
                                ? `Reps: ${dictActivity[item.exerciseID][0]}`
                                : dictExercise[item.exerciseID].exerciseType === "TIME"
                                ? `Duration ${dictActivity[item.exerciseID][0]} ${dictExercise[item.exerciseID].unitType}`
                                : `Distance ${dictActivity[item.exerciseID][0]} ${dictExercise[item.exerciseID].unitType}`
    
    const setsDescription =   dictActivity[item.exerciseID][1] !== null 
                             ? " Sets: " + `${dictActivity[item.exerciseID][1]}`
                             : " "
    
   return (quantityDescription + setsDescription);
  }
  const getExercise = async () => {
      setExercise(await getExercises());
  };
    
  const getTitle= (item) => {
      // If one of activities or exercise is empty
      if (activities.length === 0 || exercise.length === 0) return "";
      return dictExercise[item.exerciseID].name;
  }
    
  useFocusEffect(
      useCallback(() => {
        getActivities();
        getExercise();
      }, [])
  )

  const itemToParse = (itemID) => {
      const dateToPassIn =`${props.date.year}-${props.date.month}-${props.date.date}`
      const placementList = placements;
      const objToPassIn = { date: dateToPassIn, exerciseInfo: itemID, placement: placementList};
      return objToPassIn;
    }

 
  const pressHandler = () => {
        navigation.navigate("AddActivity", props);
  };

  const deleteHandler = (item) => {
      deletePlan(`${props.date.year}-${props.date.month}-${props.date.date}`, item); 
      getActivities();
    };
  

  const EditHandler = (item) =>  {
      console.log("TODO: Edit stuff:", item);
  };

    const EditIcon = (props) => (
      <Icon {...props} name='edit-2-outline'/>
    );
    const DeleteIcon = (props) => (
      <Icon {...props} name='trash-2-outline'/>
    );

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

    const placements =  AAplacements();

    const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(0));
    const placement = placements[placementIndex.row];

    const onPlacementSelect = (index) => {
      setPlacementIndex(index);
    };

     const renderToggleButton = () => (
        <Button onPress={() => setVisible(true)}>
          TOGGLE POPOVER
        </Button>
     );

     const renderPlacementItem = (title) => (
      <SelectItem title={title}/>
    );

    const renderItemAccessory = (item) => (


      <Layout >
      
      <Layout style={tailwind("m-7 right-2")}>
        <ButtonGroup  appearance = 'filled' size = 'small' >
          <Button 
            onPress = {() => setVisibleBtnA(true)}
            accessoryLeft={EditIcon} 
             />
          <Button 
            onPress = {() => setVisibleBtn(true)} 
            accessoryLeft={DeleteIcon}
             />
        </ButtonGroup> 
      </Layout> 

        <Modal visible={visibleBtnA} >
        <Card disabled={true}>
            <Text style={tailwind("text-lg font-bold")}> Which exercise would you like to change to? </Text>

              <Select
                placeholder='Select Placement'
                value={placement}
                selectedIndex={placementIndex}
                onSelect={onPlacementSelect}>
                {placements.map(renderPlacementItem)}
              </Select>

        {/* THIS IS COPIED IN
            <Layout style={tailwind("flex-grow")}>
            <Text style={tailwind("text-lg font-bold")}>
              For {exercise.name}, please enter the following!
            </Text>
            <Text>
              {exercise.quantityType === "QUANTITATIVE"
                ? `Reps`
                : exercise.quantityType === "TIME"
                ? `Duration (${exercise.quantityUnit})`
                : `Distance (${exercise.quantityUnit})`}
            </Text>
            <Input
              keyboardType="numeric"
              placeholder="e.g. 10"
              value={values.quantity}
              onChangeText={handleChange("quantity")}
            />
            {exercise.quantityType === "QUANTITATIVE" && (
              <>
                <Text>Sets</Text>
                <Input
                  keyboardType="numeric"
                  placeholder="e.g. 3"
                  value={values.sets}
                  onChangeText={handleChange("sets")}
                />
              </>
            )}
            </Layout>   */}



              {/* This is for edit */}
              <Layout style={tailwind("flex-row justify-center items-center ")}>
                <Button
                  onPress={() => {
                    setVisibleBtnA(false);
                  }}
                >
                  No
                </Button>
                <Button
                  onPress={() => {
                    EditHandler(item);
                    setVisibleBtnA(false);
                  }}
                >
                  Yes

                </Button>
              </Layout>
            </Card>
          </Modal>

          {/* This is for deleteHandler */}
          <Modal visible={visibleBtn}>
          <Card disabled={true}>
            <Text> Are you sure you want to delete this activity? </Text>
            <Layout style={tailwind("flex-row justify-center items-center ")}>
              <Button
                onPress={() => {
                  setVisibleBtn(false);
                }}
              >
                No
              </Button>
              <Button
                onPress={() => {
                  deleteHandler(item);
                  setVisibleBtn(false);
                }}
              >
                Yes
              </Button>
            </Layout>
          </Card>
        </Modal>
        </Layout>

      
    );


          
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
              <ButtonsStuff dateExercise = {itemToParse(item._id)}
                //{...console.log("hello there" , itemToParse(item._id))}
                getExercise = {getExercise}
                exercise = {exercise}
                activities = {activities}
                getActivities = {getActivities}
                />}
              title={getTitle(item)}
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