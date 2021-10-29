import React, { useState } from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Card, Input, Button } from "@ui-kitten/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../utils/auth";


export default SetFitnessPlan = ({ navigation }) => {
    const { plan } = useAuth();
    const [getPlanError, setPlanError] = useState("");
    const { handleSubmit, values, errors, touched, handleChange } = useFormik({
        initialValues: {
        date: "",
        },
    
        onSubmit: async (values) => {
        try {
            await login(values.date);
    
            // Remove error message and proceed to Homepage
            setLoginError("");
        } catch (e) {
            setLoginError(e.message);
        }
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
    
        <Layout style={tailwind("flex-row p-2")}>
            <Button onPress={navigation.goBack}>{`<-`}</Button>
            <Button onPress={handleSubmit}>Login</Button>
        </Layout>
    
        {loginError ? (
            <Text style={tailwind("text-red-600")}>{loginError}</Text>
        ) : null}
        </Layout>
    );
};