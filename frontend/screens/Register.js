import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Input, Button } from "@ui-kitten/components";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(6, "minimum 6 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")]),
});

export default Register = ({ navigation }) => {
  const { handleSubmit, values, handleChange, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    // TODO Implement register
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: registerSchema,
  });

  return (
    // TODO Improve styling
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Layout style={tailwind("flex-1 justify-center items-center")}>
        <Card style={tailwind("w-10/12")}>
          <Text category="h1" style={tailwind("text-center")}>
            Welcome to EverydayFit
          </Text>
          <Text style={tailwind("text-center")}>
            Please fill in your registration details
          </Text>
        </Card>

        {/* TODO Add labels */}
        <Layout style={tailwind("my-4")}>
          <Input
            placeholder="Enter your name"
            autoCompleteType="name"
            value={values.name}
            onChangeText={handleChange("name")}
            style={tailwind("w-8/12 my-1")}
          />
          {errors.name && touched.name ? (
            <Text style={tailwind("text-red-600")}>{errors.name}</Text>
          ) : null}
          <Input
            placeholder="Enter your email"
            autoCompleteType="email"
            value={values.email}
            onChangeText={handleChange("email")}
            style={tailwind("w-8/12 my-1")}
          />
          {errors.email && touched.email ? (
            <Text style={tailwind("text-red-600")}>{errors.email}</Text>
          ) : null}
          <Input
            placeholder="Enter password (6-50 characters)"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange("password")}
            style={tailwind("w-8/12 my-1")}
          />
          {errors.password && touched.password ? (
            <Text style={tailwind("text-red-600")}>{errors.password}</Text>
          ) : null}
          <Input
            placeholder="Re-enter your password"
            secureTextEntry
            value={values.passwordConfirmation}
            onChangeText={handleChange("passwordConfirmation")}
            style={tailwind("w-8/12")}
          />
          {errors.passwordConfirmation && touched.passwordConfirmation ? (
            <Text style={tailwind("text-red-600")}>
              Password must be the same!
            </Text>
          ) : null}
        </Layout>

        <Layout style={tailwind("flex-row")}>
          <Button onPress={() => navigation.goBack()}>{`<-`}</Button>
          <Button onPress={handleSubmit}>Register</Button>
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
};
