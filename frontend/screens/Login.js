import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Input, Button } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../utils/auth";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
// TODO Implement form validation
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Required"),
  password: Yup.string()
    .min(6, "minimum 6 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),
});

export default Login = ({ navigation }) => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const { handleSubmit, values, errors, touched, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);

        // Remove error message and proceed to Homepage
        setLoginError("");
      } catch (e) {
        setLoginError(e.message);
      }
    },

    //validationSchema: loginSchema,
  });

  return (
    // TODO Improve styling
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }} > 
    <Layout style={tailwind("flex-1 justify-center items-center")}>
      <Card style={tailwind("w-10/12")}>
        <Text category="h1" style={tailwind("text-center")}>
          Welcome to EverydayFit
        </Text>
        <Text style={tailwind("text-center")}>
          Please enter your login details
        </Text>
      </Card>

      {/* TODO Add labels */}
      <Layout style={tailwind("my-4")}>
        <Input
          placeholder="Email"
          autoCompleteType="email"
          value={values.email}
          onChangeText={handleChange("email")}
          style={tailwind("w-8/12 mb-4")}
        />
        {errors.email && touched.email ? (
          <Text style={tailwind("text-red-600")}>{errors.email}</Text>
        ) : null}
        <Input
          placeholder="Password"
          autoCompleteType="password"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange("password")}
          style={tailwind("w-8/12")}
        />
        {errors.password && touched.password ? (
          <Text style={tailwind("text-red-600")}>{errors.password}</Text>
        ) : null}
      </Layout>

      <Layout style={tailwind("flex-row p-2")}>
        <Button onPress={navigation.goBack}>{`<-`}</Button>
        <Button onPress={handleSubmit}>Login</Button>
      </Layout>

      {loginError ? (
        <Text style={tailwind("text-red-600")}>{loginError}</Text>
      ) : null}
    </Layout>
    </TouchableWithoutFeedback>
    
  );
};
