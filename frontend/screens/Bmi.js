import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Keyboard, TouchableWithoutFeedback} from 'react-native';

/* 
TODO Create custom error messages for invalid numbers (e.g. 5..2), numbers that are out of range
TODO Show error message for leading zeros (e.g. 007)
*/



const schema = Yup.object().shape({
  weight: Yup.number().min(1.0).max(999.9).required("Required"),
  height: Yup.number().min(0.01).max(9.99).required("Required"),
});

const displayWeightCat = (bmi) => {

  if (bmi <= 18.5)
  {
    return ('Underweight');
  }
  else if (bmi > 18.5 && bmi <= 24.99)
  {
    return ('Healthy');
  }
  else if (bmi >= 25.0 && bmi <= 29.9)
  {
    return ('Overweight');
  }
  else if (bmi >= 30.0)
  {
    return ('Obese');
  }
  }

export default Bmi = () => {
    const { handleSubmit, values, handleChange, errors, touched, setValues } =
    useFormik({
      initialValues: {
        weight: "",
        height: "",
        bmi: "",
        bmiCategory: "",
      },
      onSubmit: (values) => {
        // TODO Should round BMI off by 2 decimal places, not truncate (e.g. 2.007 -> 2.01, not 2.00)
        values.bmi = (
          parseFloat(values.weight) / Math.pow(parseFloat(values.height), 2)
        ).toFixed(2);
        setValues(values);

        // TODO Implement bmiCategory
        values.bmiCategory = displayWeightCat(values.bmi);
      },
      validationSchema: schema,
    });

  return (
    // TODO Improve styling
    <TouchableWithoutFeedback onPress = { () => {Keyboard.dismiss();}}>
    <Layout style={tailwind("flex-1 justify-center items-center")}>
      <Layout style={tailwind("flex-row items-center mb-2")}>
        <Text>Enter your weight</Text>
        <Input
          style={tailwind("mx-1")}
          keyboardType="numeric"
          value={values.weight}
          onChangeText={handleChange("weight")}
          maxLength={5}
        />
        <Text>kg</Text>
      </Layout>

      {errors.weight && touched.weight ? (
        <Text style={tailwind("text-red-600")}>{errors.weight}</Text>
      ) : null}

      <Layout style={tailwind("flex-row items-center mb-2")}>
        <Text>Enter your height</Text>
        <Input
          style={tailwind("mx-1")}
          keyboardType="numeric"
          value={values.height}
          onChangeText={handleChange("height")}
          maxLength={4}
        />
        <Text>m</Text>
      </Layout>
      {errors.height && touched.height ? (
        <Text style={tailwind("text-red-600")}>{errors.height}</Text>
      ) : null}

      <Button style={tailwind("mb-2")} onPress={handleSubmit}>CALCULATE</Button>
      {values.bmi !== "" && (
        <>
          <Text>Your BMI is {values.bmi}</Text>
          <Text>BMI category: {values.bmiCategory}</Text>
        </>
      )}
    </Layout>
    </TouchableWithoutFeedback>
  );
};
