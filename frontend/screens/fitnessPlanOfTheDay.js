import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Layout } from "@ui-kitten/components";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import FitnessPlanner from "../components/FitnessPlanner";

import tailwind from "tailwind-rn";

export default function FitnessPlanScreen({ route }) {
  const navigation = useNavigation();

  return (
    <Layout style={tailwind("flex-1 justify-center ")}>
      <Layout style = {tailwind("flex items-center ")}>
        <Text style = {styles.dayPLanText}>
          {" "} 
          Fitness plan for {route.params.select_date.substring(0, 10)}
        </Text>
      </Layout>

      <View style = {tailwind("flex-grow ")}>
        <FitnessPlanner />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  fitnessPLanView: {
    marginTop: 90,
    justifyContent: "center",
    alignContent: "center",
  },

  dayPLanText: {
    fontWeight: "bold",
    fontSize: 30,
    textDecorationLine: 'underline'
  },

  dateBar: {
    marginTop: 50,
    marginHorizontal: 85,
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
  },
});
