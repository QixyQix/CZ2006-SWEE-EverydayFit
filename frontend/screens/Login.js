import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Input, Button } from "@ui-kitten/components";
import { useFormik } from "formik";
import { useAuth } from "../utils/auth";

// TODO Implement form validation

export default Login = ({ navigation }) => {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const { handleSubmit, values, handleChange } = useFormik({
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
  });

  return (
    // TODO Improve styling
    <Layout style={tailwind("flex-1 justify-center items-center")}>
      <Card style={tailwind("w-10/12")}>
        <Text category="h1" style={tailwind("text-center")}>
          Welcome to EverydayFit
        </Text>
        <Text style={tailwind("text-center")}>
          Please enter your login details
        </Text>
      </Card>

      <Layout style={tailwind("my-4")}>
        <Input
          placeholder="Email"
          autoCompleteType="email"
          value={values.email}
          onChangeText={handleChange("email")}
          style={tailwind("w-8/12 mb-4")}
        />
        <Input
          placeholder="Password"
          autoCompleteType="password"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange("password")}
          style={tailwind("w-8/12")}
        />
      </Layout>
      <Layout style={tailwind("flex-row")}>
        <Button onPress={navigation.goBack}>{`<-`}</Button>
        <Button onPress={handleSubmit}>Login</Button>
      </Layout>

      {loginError ? (
        <Text style={tailwind("text-red-600")}>{loginError}</Text>
      ) : null}
    </Layout>
  );
};
