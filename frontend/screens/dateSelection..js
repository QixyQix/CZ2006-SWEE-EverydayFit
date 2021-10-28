import { StatusBar } from "expo-status-bar";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
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
      <Layout>
        <Layout>
          <MyCalendar />
        </Layout>
      </Layout>
    </>
  );
}
