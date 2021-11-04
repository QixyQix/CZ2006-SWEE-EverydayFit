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

import { useAuth } from "../utils/auth";
import { useFormik } from "formik";

export const ButtonsStuff = (props) => {

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      quantity: "",
      sets: null,
    },    
  });

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
    console.log("TODO: Edit stuff:", item);
};

   const renderPlacementItem = (title) => (
    <SelectItem title={title}/>
  );

  const deleteHandler = (item) => {
      const {getExercise, exercise, activities, getActivities} = {...props};   
      deletePlan(props.date, props.activityID); 
      props.getActivities();
  };

  //console.log('HI25', props.dictExercise);
  //console.log('HI25', props.exercise);
 console.log("HI", props.dictExercise["617c177154b84430da0627d8"].exerciseType )
  //console.log('HI22', props.dictActivity);
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

        {/* THIS IS COPIED IN 
            <Layout style={tailwind("flex-grow")}>
            <Text style={tailwind("text-lg font-bold")}>
              For {placement}, please enter the following!
            </Text>
            <Text>
              {props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0 ? "" : props.dictExercise[props.dictExerciseToID[placement]].exerciseType === "QUANTITATIVE"
                ? `Reps`
                : props.dictExercise[props.dictExerciseToID[placement]].exerciseType === "TIME"
                ? `Duration (${props.dictExercise[props.dictExerciseToID[placement]].unitType})`
                : `Distance (${props.dictExercise[props.dictExerciseToID[placement]].unitType})`}
            </Text>
            <Input
              keyboardType="numeric"
              placeholder="e.g. 10"
              value={22}
              //value={props.dictActivity[props.dictExerciseToID[placement]][1]}
              onChangeText={handleChange("quantity")}
            />
            {props.dictExercise.length === 0 || props.dictActivity.length === 0  || props.dictExerciseToID.length === 0 ? "" : props.dictExercise[props.dictExerciseToID[placement]].exerciseType === "QUANTITATIVE" && (
              <>
                <Text>Sets</Text>
                <Input
                  keyboardType="numeric"
                  placeholder="e.g. 3"
                  value={23}
                  // value = {props.dictActivity[props.dictExerciseToID[placement]][0]}
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
                    EditHandler(props.activityID);
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