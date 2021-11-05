import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import tailwind from "tailwind-rn";
import {
  Button,
  Layout,
  ButtonGroup, 
  Icon,
  Modal,
  Card,
  Text,
  Input,
  IndexPath, Select, SelectItem,
} from "@ui-kitten/components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAuth } from "../utils/auth";
import { useFormik } from "formik";

export const ButtonsStuff = (props) => {

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      sets : props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0 
        ? props.dictActivity[props.dictExerciseToID[props.exerciseName].exerciseID][1] 
        : 0 ,
      quantity: props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0 
        ? props.dictActivity[props.dictExerciseToID[props.exerciseName].exerciseID][0] 
        : null,
      done: false
      // activityID : props.activityID,
      // done : props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0 
      //   ? props.dictActivity[props.dictExerciseToID[props.exerciseName].exerciseID][2] 
      //   : false,
      // exerciseID: props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0 && placement !== null ? props.dictExerciseToID[placement].exerciseID : props.dictExerciseToID[props.exerciseName].exerciseID
      

    },    

    // onSubmit: (values) => {
    //     const itemsToParse = {_id: values.activityID, exerciseID: props.dictExerciseToID[placement].exerciseID, totalQuantity: values.quantity, sets: values.sets};
    //     patchPlan(props.date, )
    // }

    
  });

  //console.log(props.dictActivity);
  const { getPlan, setPlan, deletePlan, patchPlan } = useAuth();

  const [visibleBtn, setVisibleBtn] = useState(false);

  const [visibleBtnA, setVisibleBtnA] = useState(false);

  const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(0));
  const placement = props.placement[placementIndex.row];
  
  const onPlacementSelect = (index) => {
    setPlacementIndex(index);
  };

  const EditIcon = (props) => (
    <Icon {...props} name='edit-2-outline'/>
  );

  const DeleteIcon = (props) => (
    <Icon {...props} name='trash-2-outline'/>
  );

   const renderToggleButton = () => (
      <Button onPress={() => setVisible(true)}>
        TOGGLE POPOVER
      </Button>
   );
  
   const EditHandler = (item) =>  {
     //console.log("NYAAA:", props.dictExerciseToID[placement].exerciseID)
     const updatedPlan = {
       _id: item, 
       exerciseID: props.dictExerciseToID[placement].exerciseID, 
       totalQuantity: values.quantity, 
       sets: values.sets, 
       done: false };
       const {getExercise, exercise, activities, getActivities} = {...props};  
      patchPlan(props.date, updatedPlan);
      props.getActivities();
    //console.log("TODO: Edit stuff:", updatedPlan);
};

   const renderPlacementItem = (title) => (
    <SelectItem title={title}/>
  );

  const deleteHandler = (item) => {
      const {getExercise, exercise, activities, getActivities} = {...props};   
      deletePlan(props.date, props.activityID); 
      props.getActivities();
  };

  if(props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0){
    props.dictExerciseToID['Remain the same'] = {exerciseID: props.dictExerciseToID[props.exerciseName].exerciseID}  
  } 
  
  
return(
   
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
    
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }} >
    <Modal visible={visibleBtnA} >
        <Card disabled={true}>
            <Text style={tailwind("text-lg font-bold")}> Which exercise would you like to change to? </Text>

              <Select
                placeholder='Select Placement'
                value={placement}
                selectedIndex={placementIndex}
                onSelect={onPlacementSelect}>
                {props.placement.map(renderPlacementItem)}
              </Select>

        {/* THIS IS COPIED IN  */}
            <Layout style={tailwind("flex-grow")}>
            <Text style={tailwind("text-base")}>
              For {placement}, please enter the following!
            </Text>
            <Text style={tailwind("font-bold")}>
              {props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0 
                ? "" 
                : props.dictExercise[props.dictExerciseToID[placement].exerciseID].exerciseType === "QUANTITATIVE"
                ? `Reps`
                : props.dictExercise[props.dictExerciseToID[placement].exerciseID].exerciseType === "TIME"
                ? `Duration (${props.dictExercise[props.dictExerciseToID[placement].exerciseID].unitType})`
                : `Distance (${props.dictExercise[props.dictExerciseToID[placement].exerciseID].unitType})`}
            </Text>

            
            <Input
              keyboardType="numeric"
              placeholder={`Current: ${values.quantity}`}
              //value={22}
              value={values.quantity}
              onChangeText={handleChange("quantity")}
            />
            

            {props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0 ? "" : props.dictExercise[props.dictExerciseToID[placement].exerciseID].exerciseType === "QUANTITATIVE" && (
              <>
                <Text>Sets</Text>
                <Input
                  keyboardType="numeric"
                  placeholder= {`Current: ${values.sets}`}
                  //value={23}
                  value = {values.sets}
                  onChangeText={handleChange("sets")}
                />
              </>
            )}
            </Layout>  



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
                   // handleSubmit;
                    EditHandler(props.activityID);
                    setVisibleBtnA(false);
                  }}>
                  
                  Yes
                  </Button>
                  
              </Layout>
            </Card>
          </Modal>
          </TouchableWithoutFeedback>

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
                  deleteHandler(props.activityID);
                  setVisibleBtn(false);
                }}
              >
                Yes
              </Button>
            </Layout>
          </Card>
        </Modal>
        
      </Layout>
      
    )
}

export default ButtonsStuff;