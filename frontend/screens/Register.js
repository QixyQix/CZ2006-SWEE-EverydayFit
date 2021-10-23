import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Input, Button } from "@ui-kitten/components";
import { useFormik } from "formik";
import { Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';

// TODO Implement form validation

export default Register = ({ navigation }) => {
  const { handleSubmit, values, handleChange } = useFormik({
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
  });

  return (
    // TODO Improve styling
    <TouchableWithoutFeedback onPress = { () => {Keyboard.dismiss();}}>
    <Layout style={tailwind("flex-1 justify-center items-center")}>
      <Card style={tailwind("w-10/12")}>
        <Text category="h1" style={tailwind("text-center")}>
          Welcome to EverydayFit
        </Text>
        <Text style={tailwind("text-center")}>
          Please fill in your registration details
        </Text>
      </Card>

      <Layout style={tailwind("my-4")}>
        <Input
          placeholder="Enter your name"
          autoCompleteType="name"
          value={values.name}
          onChangeText={handleChange("name")}
          style={tailwind("w-8/12 mb-4")}
        />
        <Input
          placeholder="Enter your email"
          autoCompleteType="email"
          value={values.email}
          onChangeText={handleChange("email")}
          style={tailwind("w-8/12 mb-4")}
        />
        <Input
          placeholder="Enter your password"
          secureTextEntry
          value={values.password}
          onChangeText={handleChange("password")}
          style={tailwind("w-8/12 mb-4")}
        />
        <Input
          placeholder="Re-enter your password"
          secureTextEntry
          value={values.passwordConfirmation}
          onChangeText={handleChange("passwordConfirmation")}
          style={tailwind("w-8/12")}
        />
      </Layout>

      <Layout style={tailwind("flex-row p-2")}>
        <Button style={tailwind("mr-4")} onPress={() => navigation.goBack()}>{`<-`}</Button>
        <Button onPress={handleSubmit}>Register</Button>
      </Layout>
      
    </Layout>
    </TouchableWithoutFeedback>
  );
};
