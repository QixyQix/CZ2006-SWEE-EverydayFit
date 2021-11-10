import React from "react";
import tailwind from "tailwind-rn";
import { Layout, Text, Button, Input } from "@ui-kitten/components";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { calculateIppt } from "../utils/ippt";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ipptSchema } from "../utils/validationSchemas";
import { FontAwesome5 } from "@expo/vector-icons";

export default Ippt = () => {
  const { values, handleChange, handleSubmit, setValues, errors, touched } =
    useFormik({
      initialValues: {
        gender: "male",
        serviceType: "active",
        age: "",

        runTimeMinutes: "",
        runTimeSeconds: "",

        pushUpCount: "",
        sitUpCount: "",
        ipptPoints: "",
        grade: "",
      },

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
      validationSchema: ipptSchema,
    });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Layout style={tailwind("flex-grow justify-center items-center")}>
        <Layout style={tailwind("flex-row flex-initial items-center")}>
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
        <Layout style={tailwind("flex-row flex-initial items-center")}>
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
        <Layout style={tailwind("flex-row flex-initial items-center m-1")}>
          <Text>Enter your age: </Text>
          <Input
            keyboardType="number-pad"
            value={values.age}
            onChangeText={handleChange("age")}
            maxLength={3}
            style={tailwind("mx-1")}
          />
        </Layout>

        {errors.age && touched.age ? (
          <Text style={tailwind("text-red-600")}>{errors.age}</Text>
        ) : null}

        <Layout style={tailwind("flex-row flex-initial items-center m-1")}>
          <Text>2.4 km run: </Text>
          <Input
            keyboardType="number-pad"
            value={values.runTimeMinutes}
            onChangeText={handleChange("runTimeMinutes")}
            maxLength={2}
            style={tailwind("mx-1")}
          />
          <Text>min </Text>
          <Input
            keyboardType="number-pad"
            value={values.runTimeSeconds}
            onChangeText={handleChange("runTimeSeconds")}
            maxLength={2}
            style={tailwind("mx-1")}
          />
          <Text>s</Text>
        </Layout>

        {(errors.runTimeMinutes && touched.runTimeMinutes) ||
        (errors.runTimeSeconds && touched.runTimeSeconds) ? (
          <Text style={tailwind("text-red-600")}>Must be a valid duration</Text>
        ) : null}

        <Layout style={tailwind("flex-row flex-initial items-center m-1")}>
          <Text>Push-ups: </Text>
          <Input
            keyboardType="number-pad"
            value={values.pushUpCount}
            onChangeText={handleChange("pushUpCount")}
            maxLength={2}
            style={tailwind("mx-1")}
          />
        </Layout>

        {errors.pushUpCount && touched.pushUpCount ? (
          <Text style={tailwind("text-red-600")}>{errors.pushUpCount}</Text>
        ) : null}

        <Layout style={tailwind("flex-row flex-initial items-center m-1")}>
          <Text>Sit-ups: </Text>
          <Input
            keyboardType="number-pad"
            value={values.sitUpCount}
            onChangeText={handleChange("sitUpCount")}
            maxLength={2}
            style={tailwind("mx-1")}
          />
        </Layout>

        {errors.sitUpCount && touched.sitUpCount ? (
          <Text style={tailwind("text-red-600")}>{errors.sitUpCount}</Text>
        ) : null}

        <Layout style={tailwind("flex-initial items-center flex-col")}>
          <Button onPress={handleSubmit}>CALCULATE</Button>

          {/* TODO Add medal icon according to grade */}
          {values.ipptPoints && values.grade ? (
            <Layout style={tailwind("flex-row items-center")}>
              <Text>
                {values.ipptPoints} pts / {values.grade}
              </Text>
              {values.ipptPoints >= 85 && (
                <FontAwesome5
                  style={tailwind("flex-row items-center left-2")}
                  name="medal"
                  size={15}
                  color="gold"
                />
              )}
              {values.ipptPoints >= 75 && values.ipptPoints < 85 && (
                <FontAwesome5
                  style={tailwind("flex-row items-center left-2")}
                  name="medal"
                  size={15}
                  color="silver"
                />
              )}
              {values.ipptPoints >= 61 && values.ipptPoints < 75 && (
                <FontAwesome5
                  style={tailwind("flex-row items-center left-2")}
                  name="medal"
                  size={15}
                  color="brown"
                />
              )}
            </Layout>
          ) : null}
        </Layout>
      </Layout>
    </TouchableWithoutFeedback>
  );
};
