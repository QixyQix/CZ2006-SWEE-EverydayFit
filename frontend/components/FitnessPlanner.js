import React, { useContext } from "react";
import tailwind from "tailwind-rn";
import {
  Divider,
  List,
  ListItem,
  Button,
  CheckBox,
  Layout,
} from "@ui-kitten/components";
import AppContext from "./database";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EditButton from "./EditButton";

export default FitnessPlanner = (props) => {
  const navigation = useNavigation();
  const myContext = useContext(AppContext);
  
  // const switchState = (state, index) => {
  //   let newArr = [...myContext.activityName];
  //   newArr[index]["checked"] = state;
  //   myContext.setActivity(newArr);
  // };

  const pressHandler = () => {
    navigation.navigate("AddActivity", props);
  };


  const renderItem = ({ item, index }) => (
    <Layout style={tailwind("flex-col")} level="1">
      <CheckBox
        style={tailwind("left-3")}
        checked={item.checked}
        status="primary"
        onChange={(checknext) => switchState(checknext, index)}
      >
        <ListItem
          accessoryRight={<EditButton index={index} />}
          title={`${item.title}`}
          description={`${item.description}`}
        />
      </CheckBox>
    </Layout>
  );

  return (
    <Layout style={tailwind("flex-grow flex-initial items-center m-1")}>
      <List
        data={myContext.activityName}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
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
