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
import { isNumeric, quantitativeSchema, timeSchema, distanceSchema }  from "../utils/validationSchemas";
import { FontAwesome5 } from "@expo/vector-icons";

export const ButtonsStuff = (props) => {

  const { values, handleChange } = useFormik({
    initialValues: {
      sets : props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0 
        ? props.dictActivity[props.dictExerciseToID[props.exerciseName].exerciseID][1] 
        : 0 ,
      quantity: props.dictExercise.length !== 0 && props.dictActivity.length !== 0  
        ? props.dictQuantity[props.activityID][0] 
        : null,
      done: false
    },

    validationSchema : (props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0
                        ? "" 
                        : props.dictExercise[props.dictExerciseToID[placement].exerciseID].exerciseType === "QUANTITATIVE"
                        ? quantitativeSchema
                        : props.dictExercise[props.dictExerciseToID[placement].exerciseID].exerciseType === "TIME"
                        ? timeSchema
                        : distanceSchema)
  });

  const { getPlan, setPlan, deletePlan, patchPlan } = useAuth();
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [visibleBtnA, setVisibleBtnA] = useState(false);
  const [placementIndex, setPlacementIndex] = useState(new IndexPath(0));
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
  
   const EditHandler = async (item) =>  {
     const updatedPlan = {
       _id: item, 
       exerciseID: props.dictExerciseToID[placement].exerciseID, 
       totalQuantity: values.quantity,
       sets: values.sets >= 1? values.sets: 1, 
       done: false };
       const {getExercise, exercise, activities, getActivities} = {...props};  
       await patchPlan(props.date, updatedPlan);
       await props.getActivities();
};

   const renderPlacementItem = (title, index) => (
    <SelectItem title={title} key={index} />
  );

  const deleteHandler =  async (item) => {
      const {getExercise, exercise, activities, getActivities} = {...props};   
      await deletePlan(props.date, props.activityID); 
      await props.getActivities();
  };

  if(props.dictExercise.length !== 0 && props.dictActivity.length !== 0  && props.dictExerciseToID.length !== 0){
    props.dictExerciseToID['Remain the same'] = {exerciseID: props.dictExerciseToID[props.exerciseName].exerciseID}  
  } 
  
  const getCalorieCount = () => {
    if (props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0) return ""
    if (typeof(props.dictActivity) === 'undefined') return  123;
    
    const choice = props.placement[placementIndex.row]
    const newExerciseId = props.dictExerciseToID[choice].exerciseID
    
    const calorieUnit = props.dictExercise[newExerciseId].caloriesBurnt 
    const numQuantity = props.dictQuantity[props.activityID][0]
    const numSets = props.dictQuantity[props.activityID][1]
    
    if (props.dictExercise[props.exerciseID].exerciseType !== "QUANTITATIVE")
    {
      return ( (numQuantity * calorieUnit).toFixed(2) );
    }else
    {
      return ( (numQuantity * numSets * calorieUnit).toFixed(2) );
    }
    
  }

return(
    
  <Layout>
  
    <Layout style={tailwind("m-1 flex-row right-10 items-center ")}>

    <FontAwesome5
        style={tailwind("pb-1 right-5 items-center")}
        name="fire"
        size={15}
        color="red"
      />
   
    <Text style={tailwind("text-xs right-3")}> {getCalorieCount()} kcal </Text>

    
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
              value={values.quantity}
              onChangeText={handleChange("quantity")}
              maxLength={5}
            />
            {errors.quantity && touched.quantity ? (
                  <Text style={tailwind("text-red-600")}>{errors.quantity}</Text>
                  ) : null}
            

            {props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0 ? "" : props.dictExercise[props.dictExerciseToID[placement].exerciseID].exerciseType === "QUANTITATIVE" && (
              <>
                <Text style={tailwind("font-bold")}> Sets</Text>
                
                <Input
                  keyboardType="numeric"
                  placeholder= {`Current: ${values.sets}`}
                  value = {values.sets}
                  onChangeText={handleChange("sets")}
                  maxLength={5}
                />
                
              </>
            )}


            {errors.sets && touched.sets ? (
                  <Text style={tailwind("text-red-600")}>{errors.sets}</Text>
                  ) : null}
            </Layout>  

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
            <Layout style={ tailwind("flex-row justify-center items-center ") }>
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