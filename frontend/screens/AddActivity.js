import React, { useState, useEffect } from "react";
import tailwind from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { Layout, Divider, List, ListItem } from "@ui-kitten/components";
import { getExercises } from "../utils/exercises";
import { MaterialIcons } from "@expo/vector-icons";

export default AddActivity = () => {
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
        navigation.navigate("SetQuantity", item);
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
