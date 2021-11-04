import React, { useState, useEffect } from "react";
import tailwind from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { Layout, Divider, List, ListItem } from "@ui-kitten/components";
import { getExercises } from "../utils/exercises";
import { MaterialIcons } from "@expo/vector-icons";
export default AddActivity = ({ route }) => {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const getExercisesAndUpdateState = async () => {
    setExercises(await getExercises());
  };
  // TODO Add error catching
  useEffect(() => {
    getExercisesAndUpdateState();
  }, []);
  // TODO Improve styling
  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        let indexToParse = route.params;
        let itemToParse = {...item, ...indexToParse};
        navigation.navigate("SetQuantity", itemToParse);
      }}
      title={item.name}
      accessoryRight={
        item.outdoorOnly ? (
          <MaterialIcons name="nature-people" size={24} color="black" />
        ) : null
      }
    />
  );
  return (
    <Layout style={tailwind("flex-1")}>
      <List
        data={exercises}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Layout>
  );
};