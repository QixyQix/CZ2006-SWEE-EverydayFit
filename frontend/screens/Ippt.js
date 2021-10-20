import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { calculateIppt } from "../utils/ippt";
import { Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';

// TODO Add form validation

export default Ippt = () => {
  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: {
      gender: "male",
      serviceType: "active",
      age: "",

      // TODO Resolve diffs with class diagram (original version has only 1 field for runTime)
      runTimeMinutes: "",
      runTimeSeconds: "",

      pushUpCount: "",
      sitUpCount: "",
      ipptPoints: "",
      grade: "",
    },

    onSubmit: (values) => {
      // Convert minutes and seconds to only seconds
      const runTime =
        parseInt(values.runTimeMinutes) * 60 + parseInt(values.runTimeSeconds);

      const { ipptPoints, grade } = calculateIppt(
        parseInt(values.age),
        parseInt(values.pushUpCount),
        parseInt(values.sitUpCount),
        runTime,
        values.serviceType,
        values.gender
      );

      // Update new values
      setValues({ ...values, ipptPoints, grade });
    },
  });

  return (
    // TODO Improve styling
    <TouchableWithoutFeedback onPress = { () => {Keyboard.dismiss();}}>
    <ScrollView>
    <Layout style={tailwind("flex-1 justify-center items-center pb-10")}>
      <Layout style={tailwind("flex-row items-center h-16 mt-8 mb-16")}>
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
      <Layout style={tailwind("flex-row items-center h-4 mb-16")}>
        <Text>Type of Service: </Text>
        <Picker
          selectedValue={values.serviceType}
          onValueChange={(itemValue, _) =>
            handleChange("serviceType")(itemValue)
          }
          style={tailwind("w-4/12")}
        >
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="NSman" value="nsman" />
        </Picker>
      </Layout>
      <Layout style={tailwind("flex-row items-center mb-2")}>
        <Text>Enter your age: </Text>
        <Input
          keyboardType="number-pad"
          value={values.age}
          onChangeText={handleChange("age")}
          maxLength={3}
        />
      </Layout>
      <Layout style={tailwind("flex-row items-center mb-2")}>
        <Text>2.4 km run: </Text>
        <Input
          style={tailwind("mx-1")}
          keyboardType="number-pad"
          value={values.runTimeMinutes}
          onChangeText={handleChange("runTimeMinutes")}
          maxLength={2}
        />
        <Text>min </Text>
        <Input
          style={tailwind("mx-1")}
          keyboardType="number-pad"
          value={values.runTimeSeconds}
          onChangeText={handleChange("runTimeSeconds")}
          maxLength={2}
        />
        <Text>s</Text>
      </Layout>
      <Layout style={tailwind("flex-row items-center mb-2")}>
        <Text>Push-ups: </Text>
        <Input
          keyboardType="number-pad"
          value={values.pushUpCount}
          onChangeText={handleChange("pushUpCount")}
          maxLength={2}
        />
      </Layout>
      <Layout style={tailwind("flex-row items-center mb-2")}>
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
    </ScrollView>
    </TouchableWithoutFeedback>
  );
};
