import React, { useState, useContext } from "react";
import tailwind from "tailwind-rn";
import {
  Icon,
  Button,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  Modal,
  Card,
} from "@ui-kitten/components";
import AppContext from "./database";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/auth";

export const EditButton = (props) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const { getPlan, deletePlan } = useAuth();
  const myContext = useContext(AppContext);

  const pressHandler = (index, which) => {
    if (which == 0) {
      navigation.navigate("AddActivity");
      setVisible(false);
    } else {
      setVisible(false);
    }
  };

  const deleteHandler = (currentActivity) => {
    const {getExercise, exercise, activity, setActivity} = {...props};
    deletePlan(currentActivity.date, currentActivity.exerciseInfo); 
    setVisible(false);
    props.getActivities();
  };

  const renderItemAccessory = () => (
    <Button
      style = {tailwind("right-4")}
      appearance="ghost"
      accessoryRight={<Icon fill="#8F9BB3" name="more-vertical-outline" />}
      onPress={() => setVisible(true)}
    ></Button>
  );

  return (
    <Layout>
      <OverflowMenu
        anchor={renderItemAccessory}
        visible={visible}
        placement="left start"
        onBackdropPress={() => setVisible(false)}
      >
        <MenuItem title="Edit" onPress={() => pressHandler(props.activityID, 0)} />
        <MenuItem title="Delete" onPress={() => setVisibleBtn(true)} />
      </OverflowMenu>

      <Modal visible={visibleBtn}>
        <Card disabled={true}>
          <Text> Are you sure you want to delete this activity? </Text>
          <Layout style={tailwind("flex-row justify-center items-center ")}>
            <Button
              onPress={() => {
                setVisibleBtn(false);
                setVisible(false);
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
  );
};

export default EditButton;
