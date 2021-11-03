import React, { useEffect } from "react";
import { Layout, Text } from "@ui-kitten/components";
import FitnessPlanner from "../components/FitnessPlanner";
import tailwind from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";


export default function FitnessPlanScreen({ route }) {
  const navigation = useNavigation();
   return (
    <Layout style={tailwind("flex-1")}>
      <Layout style = {tailwind("items-center ")}>
        <Text style = {tailwind("font-bold text-2xl")}>
          {" "} 
          Fitness plan for {route.params.day}
          
        </Text>
      </Layout>
      
      <Layout style = {tailwind("flex-grow ")}>
        <FitnessPlanner date = {route.params}/>
      </Layout>
    </Layout>
  );
}
