import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Input, Button } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";

// TODO Implement form validation
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Required"),
  password: Yup.string()
    .min(6, "minimum 6 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),
});

export default Login = ({ navigation }) => {
  const { handleSubmit, values, errors, touched, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // TODO Implement login
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },

    validationSchema: loginSchema,
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

      <Layout style={tailwind("flex-row")}>
        <Button onPress={() => navigation.goBack()}>{`<-`}</Button>
        {/* <Button onPress={handleSubmit}>Login</Button>*/}
        <Button onPress={() => navigation.navigate("HomeScrn")}>Login</Button>
      </Layout>
    </Layout>
  );
};
