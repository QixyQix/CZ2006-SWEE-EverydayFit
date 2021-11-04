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
  IndexPath, Select, SelectItem,
} from "@ui-kitten/components";

import { useAuth } from "../utils/auth";


export const ButtonsStuff = (props) => {

  const { getPlan, setPlan, deletePlan, patchPlan } = useAuth();

  const [visibleBtn, setVisibleBtn] = useState(false);

  const [visibleBtnA, setVisibleBtnA] = useState(false);

  const [placementIndex, setPlacementIndex] = React.useState(new IndexPath(0));
  const placement = props.dateExercise.placement[placementIndex.row];
  //console.log("hello", props);
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
      deletePlan(props.dateExercise.date, props.dateExercise.exerciseInfo); 
      props.getActivities();
  };
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
                {props.dateExercise.placement.map(renderPlacementItem)}
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
                    EditHandler(props.dateExercise.exerciseInfo);
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
                  deleteHandler(props.dateExercise.exerciseInfo);
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