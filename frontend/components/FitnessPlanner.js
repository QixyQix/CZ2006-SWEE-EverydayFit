import React, { useContext } from "react";
import tailwind from "tailwind-rn";
import {
  Divider,
  List,
  ListItem,
  Button,
  CheckBox,
  Layout,
  Text,
} from "@ui-kitten/components";
import AppContext from "./database";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import EditButton from "./EditButton";

export default FitnessPlanner = () => {
  const navigation = useNavigation();
  const myContext = useContext(AppContext);

  // const alertHandler = (index) => {
  //   Alert.alert("Confirm", "Are you sure you want to delete this activity?", [
  //     {
  //       text: "No",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "Yes", onPress: () => deleteActivity(index) },
  //   ]);
  // };

  //  const [activity, setActivity] = useState([
  //    {title: 'Push-up', checked: false},
  //    {title: 'Sit-up', checked: false},
  //    {title: 'Planks', checked: false},
  //    {title: 'Push-up', checked: false}])

  // const renderItemAccessory = (index) => (
  //   <Button
  //     style={tailwind("")}
  //     appearance="ghost"
  //     accessoryRight={
  //       <MaterialCommunityIcons size={20} name="delete" color="maroon" />
  //     }
  //     onPress={() => alertHandler(index)}
  //   ></Button>
  // );

  const switchState = (state, index) => {
    let newArr = [...myContext.activityName];
    newArr[index]["checked"] = state;
    myContext.setActivity(newArr);
  };

  const pressHandler = () => {
    navigation.navigate("ADDACTIVITY");
  };

  // const deleteActivity = (index) => {
  //   if (index !== -1) {
  //     myContext.setActivity([
  //       ...myContext.activityName.slice(0, index),
  //       ...myContext.activityName.slice(index + 1),
  //     ]);
  //   }
  // };

  const renderItem = ({ item, index }) => (
    <Layout style={tailwind("flex-col")} level="1">
      <CheckBox
        style={tailwind("")}
        checked={item.checked}
        status="primary"
        onChange={(checknext) => switchState(checknext, index)}
      >
        <ListItem
          //accessoryLeft = {renderItemIcon}
          accessoryRight={<EditButton index={index} />}
          title={`${item.title}`}
          description={`${item.description}`}
        />
      </CheckBox>
    </Layout>
  );
  
  return (
    <Layout>
      <Text style={tailwind("text-center font-bold text-xl")}>
        FITNESS PLAN OF THE DAY
      </Text>
      <List
        data={myContext.activityName}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      <Button
        style={tailwind("mx-20")}
        accessoryLeft={
          <MaterialCommunityIcons size={21} name="pencil-plus" color="white" />
        }
        status="success"
        onPress={pressHandler}
      >
        Add Fitness Activity
      </Button>
    </Layout>
  );
};
