import "react-native-gesture-handler";
import React, { useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./AppNavigator";
import AppContext from "./components/database";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./utils/auth";
import { LogBox } from 'react-native';


export default function App() {
  const [activity, setActivity] = useState([]);

  const userSettings = {
    activityName: activity,
    setActivity,
  };
  
  LogBox.ignoreLogs(['Warning: Failed prop type: Invalid props.style key `tintColor` supplied to `Text`.', 'Warning: Failed prop type: Invalid prop `color` supplied to `Text`:']);

  return (
    <AuthProvider>
      <AppContext.Provider value={userSettings}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigator />
          <StatusBar hidden={true} />
        </ApplicationProvider>
      </AppContext.Provider>
    </AuthProvider>
  );
}
