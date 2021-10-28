import React, { useContext } from "react";
import { Alert, Keyboard, Pressable} from "react-native";

import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppContext from "./database.js";
import tailwind from "tailwind-rn";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

export default function SetReps({ route }) {
  const myContext = useContext(AppContext);

  const navigation = useNavigation();
  const activity = route.params.title;
  const checkedVal = route.params.checked;

  const alertHandler = () => {
    Alert.alert("Error!", "Value cannot be less than zero.", [
      { text: "Understood", style: "cancel" },
    ]);
  };

  const pressHandler = () => {
    if (reps <= 0 || sets <= 0) {
      alertHandler();
    } else {
      myContext.setActivity([
        ...myContext.activityName,
        {
          title: activity,
          checked: checkedVal,
          description: "Reps: " + reps + " Sets: " + sets,
        },
      ]);
      navigation.navigate("HomeScrn");
    }
  };

  const [reps, setReps] = React.useState("");
  const [sets, setSets] = React.useState("");

  return (

    <TouchableWithoutFeedback onPress={()=> { Keyboard.dismiss()}} style={tailwind("flex-grow")} >
      <Layout style={tailwind("flex-grow")} >
        <Text style={tailwind("text-lg font-bold")}>
          {" "}
          For {route.params.title}, please enter the following!{" "}
        </Text>

        <Text> Number of Reps </Text>
        
        
        <Input
          keyboardType="numeric"
          placeholder="e.g. 10"
          value={reps}
          onChangeText={(nextValue) => setReps(nextValue)}
        />

        <Text> Number of Sets </Text>
        <Input
          keyboardType="numeric"
          placeholder="e.g. 3"
          value={sets}
          onChangeText={(nextValue) => setSets(nextValue)}
        />

        <Button
          accessoryLeft={
            <Feather 
              size={21} 
              name="plus-circle" 
              color="white" />
          }
          onPress={pressHandler}
        >
          Add Activity
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
