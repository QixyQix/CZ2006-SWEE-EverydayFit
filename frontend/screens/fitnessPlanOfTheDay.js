import React from "react";
import { Layout } from "@ui-kitten/components";
import {
  StyleSheet,
  Text,
} from "react-native";
import FitnessPlanner from "../components/FitnessPlanner";
import tailwind from "tailwind-rn";


export default function FitnessPlanScreen({ route }) {
  return (
    <Layout style={tailwind("flex-1")}>
      <Layout style = {tailwind("items-center ")}>
        <Text style = {tailwind("font-bold text-3xl")}>
          {" "} 
          Fitness plan for {route.params.select_date.substring(0, 10)}
        </Text>
      </Layout>

      <Layout style = {tailwind("flex-grow ")}>
        <FitnessPlanner />
      </Layout>
    </Layout>
  );
}
