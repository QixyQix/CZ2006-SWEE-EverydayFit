import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { calculateIppt } from "../utils/ippt";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import * as Yup from "yup";

const isTwoDigit = (value) => /^[1-9]?\d$/.test(value);
const isSeconds = (value) => /^[1-5]?[0-9]$/.test(value);

const schema = Yup.object().shape({
  gender: Yup.string().required("Required"),
  serviceType: Yup.string().required("Required"),
  age: Yup.string()
    .required("Required")
    .test("Age", "Must be a positive integer", isTwoDigit),
  runTimeMinutes: Yup.string().test("Minutes", isTwoDigit).required("Required"),
  runTimeSeconds: Yup.string()
    .test("Seconds", isTwoDigit)
    .required("Required"),
  pushUpCount: Yup.string()
    .test("Push Up", "Must be a positive integer", isTwoDigit)
    .required("Required"),
  sitUpCount: Yup.string()
    .test("Sit Up", "Must be a positive integer", isTwoDigit)
    .required("Required"),
});

export default Ippt = () => {
  const { values, handleChange, handleSubmit, setValues, errors, touched } =
    useFormik({
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

      // TODO Show appropriate error message if calculateIppt returns undefined
      onSubmit: (values) => {
        // Convert minutes and seconds to only seconds
        const runTime =
          parseInt(values.runTimeMinutes) * 60 +
          parseInt(values.runTimeSeconds);

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
      validationSchema: schema,
    });

  return (
    // TODO Improve styling
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
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

        <Layout style={tailwind("flex-row items-center")}>
          <Text>Enter your age: </Text>
          <Input
            keyboardType="number-pad"
            value={values.age}
            onChangeText={handleChange("age")}
            maxLength={2}
          />
        </Layout>

        {errors.age && touched.age ? (
          <Text style={tailwind("text-red-600")}>{errors.age}</Text>
        ) : null}

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

        {(errors.runTimeMinutes && touched.runTimeMinutes) ||
        (errors.runTimeSeconds && touched.runTimeSeconds) ? (
          <Text style={tailwind("text-red-600")}>Must be a valid duration</Text>
        ) : null}

        <Layout style={tailwind("flex-row items-center")}>
          <Text>Push-ups: </Text>
          <Input
            keyboardType="number-pad"
            value={values.pushUpCount}
            onChangeText={handleChange("pushUpCount")}
            maxLength={2}
          />
        </Layout>

        {errors.pushUpCount && touched.pushUpCount ? (
          <Text style={tailwind("text-red-600")}>{errors.pushUpCount}</Text>
        ) : null}

        <Layout style={tailwind("flex-row items-center")}>
          <Text>Sit-ups: </Text>
          <Input
            keyboardType="number-pad"
            value={values.sitUpCount}
            onChangeText={handleChange("sitUpCount")}
            maxLength={2}
          />
        </Layout>

        {errors.sitUpCount && touched.sitUpCount ? (
          <Text style={tailwind("text-red-600")}>{errors.sitUpCount}</Text>
        ) : null}

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
    </TouchableWithoutFeedback>
  );
};
