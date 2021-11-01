import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isNumeric, schema }  from "../utils/validationSchemas";
import tailwind from "tailwind-rn";

// TODO Add form validation
export default function SetQuantity({ route }) {
  const navigation = useNavigation();

  const exercise = route.params;
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      quantity: "",
      sets: null,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout>
        <Text style={tailwind("text-lg font-bold")}>
          For {exercise.name}, please enter the following!
        </Text>

        {/* Show labels conditionally */}
        <Text>
          {exercise.quantityType === "QUANTITATIVE"
            ? `Reps`
            : exercise.quantityType === "TIME"
            ? `Duration (${exercise.quantityUnit})`
            : `Distance (${exercise.quantityUnit})`}
        </Text>

        <Input
          keyboardType="numeric"
          placeholder="e.g. 10"
          value={values.quantity}
          onChangeText={handleChange("quantity")}
        />

        {/* Show Sets field if quantitative */}
        {exercise.quantityType === "QUANTITATIVE" && (
          <>
            <Text>Sets</Text>
            <Input
              keyboardType="numeric"
              placeholder="e.g. 3"
              value={values.sets}
              onChangeText={handleChange("sets")}
            />
          </>
        )}

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
