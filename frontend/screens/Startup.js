import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Button } from "@ui-kitten/components";

export default Startup = ({ navigation }) => {
  return (
    <Layout style={tailwind("flex-1 justify-center items-center")}>
      <Card style={tailwind("w-10/12")}>
        <Text category="h1" style={tailwind("text-center")}>
          Welcome to EverydayFit
        </Text>
      </Card>
      <Button onPress={() => navigation.navigate("Register")}>Register</Button>
      <Button onPress={() => navigation.navigate("Login")}>Login</Button>
    </Layout>
  );
};
