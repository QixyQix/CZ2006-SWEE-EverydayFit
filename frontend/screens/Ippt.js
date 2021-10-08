import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";

import { PrivateValueStore, useNavigation } from '@react-navigation/native';
import Calculator from "../testIPPT/calculator";

// TODO Add form validation

export default Ippt = () => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      gender: "male",
      typeOfService: "active",
      age: "",

      // TODO Resolve diffs with class diagram (original version has only 1 field for runTime)
      runTimeMinutes: "",
      runTimeSeconds: "",

      pushUpCount: "",
      sitUpCount: "",
      ipptPoints: "",
      grade: "",
    },

    // TODO Implement IPPT calculation
    
    onSubmit: (values) => { <Calculator age = {values.age} pushUpCount = {values.pushUpCount} sitUpCount = {values.sitUpCount} runCount = {values.runTimeMinutes* 60 + values.runTimeSeconds} serviceType = {values.typeOfService} /> } 
  });

  return (
    // TODO Improve styling
    <Layout style={tailwind("flex-1 justify-center items-center")}>
      <Layout style={tailwind("flex-row items-center")}>
        <Text>Gender: </Text>
        <Picker
          selectedValue={values.gender}
          onValueChange={(itemValue, _) => handleChange("gender")(itemValue)}
          style={tailwind("w-4/12")}
        >
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </Layout>
      <Layout style={tailwind("flex-row items-center")}>
        <Text>Type of Service: </Text>
        <Picker
          selectedValue={values.typeOfService}
          onValueChange={(itemValue, _) =>
            handleChange("typeOfService")(itemValue)
          }
          style={tailwind("w-4/12")}
        >
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="NSman" value="nsman" />
        </Picker>
      </Layout>
      <Layout style={tailwind("flex-row items-center")}>
        <Text>Enter your age: </Text>
        <Input
          keyboardType="number-pad"
          value={values.age}
          onChangeText={handleChange("age")}
          maxLength={3}
        />
      </Layout>
      <Layout style={tailwind("flex-row items-center")}>
        <Text>2.4 km run: </Text>
        <Input
          keyboardType="number-pad"
          value={values.runTimeMinutes}
          onChangeText={handleChange("runTimeMinutes")}
          maxLength={2}
        />
        <Text>min </Text>
        <Input
          keyboardType="number-pad"
          value={values.runTimeSeconds}
          onChangeText={handleChange("runTimeSeconds")}
          maxLength={2}
        />
        <Text>s</Text>
      </Layout>
      <Layout style={tailwind("flex-row items-center")}>
        <Text>Push-ups: </Text>
        <Input
          keyboardType="number-pad"
          value={values.pushUpCount}
          onChangeText={handleChange("pushUpCount")}
          maxLength={2}
        />
      </Layout>
      <Layout style={tailwind("flex-row items-center")}>
        <Text>Sit-ups: </Text>
        <Input
          keyboardType="number-pad"
          value={values.sitUpCount}
          onChangeText={handleChange("sitUpCount")}
          maxLength={2}
        />
      </Layout>

      <Layout style={tailwind("flex-row items-center")}>
        <Button onPress={handleSubmit}>CALCULATE</Button>

        {/* TODO Add medal icon according to grade */}
        {values.ipptPoints && values.grade ? (
          <Text>
            {values.ipptPoints} pts / {values.grade}
          </Text>
        ) : null}
      </Layout>
    </Layout>
  );
};
