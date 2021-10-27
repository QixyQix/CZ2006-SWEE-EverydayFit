import React, { useContext } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppContext from "./database.js";
import tailwind from "tailwind-rn";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function SetReps({ route }) {
  const myContext = useContext(AppContext);

  const navigation = useNavigation();
  const activity = route.params.title;
  const checkedVal = route.params.checked;

  const setRepSchema = Yup.object().shape({
    reps: Yup.string()
      .required("Required")
      .test("isMoreThan0", "Minimum 1 rep", (val) => {return parseInt(val)>0;})
      .test("Integer", "reps must be whole number", (val) => {return !(val.includes("."));}),
    sets: Yup.string()
      .required("Required")
      .test("isMoreThan0", "Minimum 1 set", (val) => {return parseInt(val)>0;})
      .test("Integer", "reps must be whole number", (val) => {return !(val.includes("."));}),
  });

  const { handleSubmit, values, handleChange, errors, touched, setValues } =
    useFormik({
      initialValues: {
        reps: "10",
        sets: "1",
      },
      onSubmit: (values) => {
        myContext.setActivity([
          ...myContext.activityName,
          {
            title: activity,
            checked: checkedVal,
            description: "Reps: " + values.reps + " Sets: " + values.sets,
          },
        ]);
        navigation.navigate("HomeScrn");
      },
      validationSchema: setRepSchema,
    });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Layout>
        <Text style={tailwind("text-lg font-bold m-2")}>
          {" "}
          For {route.params.title}, please enter the following!{" "}
        </Text>

        <Layout style={tailwind("m-2")}>
          <Text> Number of Reps </Text>
          <Input
            keyboardType="numeric"
            placeholder="e.g. 10"
            value={values.reps}
            clearTextOnFocus
            onChangeText={handleChange("reps")}
          />

          {errors.reps && touched.reps ? (
                            <Text style={tailwind("text-red-600")}>{errors.reps}</Text>
                          ) : null}
        </Layout>

        
        <Layout style={tailwind("m-2")}>
          <Text> Number of Sets </Text>
          <Input
            keyboardType="numeric"
            placeholder="e.g. 3"
            value={values.sets}
            clearTextOnFocus
            onChangeText={handleChange("sets")}
          />

          {errors.sets && touched.sets ? (
                    <Text style={tailwind("text-red-600")}>{errors.sets}</Text>
                  ) : null}
        </Layout>

        <Button
          accessoryLeft={
            <MaterialCommunityIcons
              size={20}
              name="pencil-plus"
              color="white"
            />
          }
          onPress={handleSubmit}
        >
          Add Activity
        </Button>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
