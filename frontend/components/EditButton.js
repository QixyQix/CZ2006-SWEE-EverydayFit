import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import {
  Icon,
  Button,
  Layout,
  MenuItem,
  OverflowMenu,
} from "@ui-kitten/components";
import AppContext from "./database";
import { useNavigation } from "@react-navigation/native";

export const EditButton = (index) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const myContext = useContext(AppContext);

  const alertHandler = (index, which) => {
    if (which == 0) {
      navigation.navigate("ADDACTIVITY");
      setVisible(false);
    } else if (which == 1) {
      Alert.alert("Confirm", "Are you sure you want to delete this activity?", [
        {
          text: "No",
          onPress: () => setVisible(false),
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteHandler(index) },
      ]);
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
        <MenuItem title="Edit" onPress={() => alertHandler(index.index, 0)} />
        <MenuItem title="Delete" onPress={() => alertHandler(index.index, 1)} />
        <MenuItem
          title="Replace"
          onPress={() => alertHandler(index.index, 2)}
        />
      </OverflowMenu>
    </Layout>
  );
};

export default EditButton;
