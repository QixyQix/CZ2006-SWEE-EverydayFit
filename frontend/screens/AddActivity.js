import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { Layout, Divider, List, ListItem } from "@ui-kitten/components";

export default AddActivity = () => {
  const navigation = useNavigation();

  const [activity, setActivity] = useState([
    { title: "Running", checked: false },
    { title: "Jumping Jacks", checked: false },
    { title: "Push-up", checked: false },
    { title: "Burpees", checked: false },
  ]);

  const renderItem = ({ item, index }) => (
    <ListItem
      onPress={() => {
        navigation.navigate("SETREPS", item);
      }}
      title={item.title}
    />
  );
  return (
    <Layout style={tailwind("flex-1")}>
      <List
        data={activity}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Layout>
  );
};
