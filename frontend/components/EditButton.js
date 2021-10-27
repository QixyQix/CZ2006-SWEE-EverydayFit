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

export const EditButton = (index) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const myContext = useContext(AppContext);


  const pressHandler = (index, which) => {
    if (which == 0) {
      navigation.navigate("EDITACTIVITY", {index: index});
      setVisible(false);
    } else {
      setVisible(false);
    }
  };


  const deleteHandler = (index) => {
    if (index !== -1) {
      setVisible(false);
      myContext.setActivity([
        ...myContext.activityName.slice(0, index),
        ...myContext.activityName.slice(index + 1),
      ]);
    }
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
        <MenuItem 
          title="Edit" 
          onPress={() => pressHandler(index.index, 0)} />
        <MenuItem 
          title="Delete" 
          onPress={() => setVisibleBtn(true)} />
      </OverflowMenu>

      <Modal visible={visibleBtn} >
          <Card disabled={true}  >
            <Text> Are you sure you want to delete this activity? </Text> 
            <Layout style={tailwind("flex-row justify-center items-center ")}>
            <Button onPress={() => {setVisibleBtn(false); setVisible(false)}}>
              No
            </Button>
            <Button onPress={ () => {deleteHandler(index.index); setVisibleBtn(false);} } >
              Yes
            </Button>
            </Layout> 
          </Card>
      </Modal>

    </Layout>

  );
};

export default EditButton;
