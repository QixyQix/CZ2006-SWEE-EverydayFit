import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import MyCalendar from "../components/calendar";

export default function dateSelectScreen() {
  return (
    <>
      <View styles={styles.container}>
        <View styles={styles.container}>
          <MyCalendar />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "beige",
    justifyContent: "space-between",
  },
});
