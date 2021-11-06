import React, { useContext, useState, createContext, useEffect } from "react";
import { API_URL } from "@env";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    lastFetched: null,
    token: null,
    refreshToken: null,
  });

  // TODO Add a loading screen while fetching the stored data
  const [isLoading, setIsLoading] = useState(true);

  // Load auth values once the app is opened
  useEffect(() => {
    loadSavedAuth();
  }, []);

  const registerForPushNotifications = async () => {
    try {
      // Get the token that identifies this device
      let pushToken = await Notifications.getExpoPushTokenAsync();

      // POST the token
      await axios.post(
        `${API_URL}/auth/expoToken`,
        {
          expoToken: pushToken.data.slice(18, 40),
        },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  // Registers for push notifications after logging in
  useEffect(() => {
    if (auth.token) {
      registerForPushNotifications();
    }
  }, [auth]);

  const loadSavedAuth = async () => {
    try {
      const authData = await AsyncStorage.getItem("auth");

      // If auth data is available, update the state
      if (authData) {
        setAuth(JSON.parse(authData));
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  // Base function for login and register for reusability
  const base = async (method, body) => {
    const res = await axios.post(`${API_URL}/auth/${method}`, body);

    if (res.status == 200) {
      // FIXME Not sure if we should store the tokens locally
      const authData = {
        lastFetched: new Date(),
        token: res.data.token,
        refreshToken: res.data.refreshToken,
      };

      // Store data and set auth state
      await AsyncStorage.setItem("auth", JSON.stringify(authData));
      setAuth(authData);

      return res.data;
    } else {
      throw res.data;
    }
  };

  const login = (email, password) => base("login", { email, password });

  const register = (email, name, password) =>
    base("register", { email, name, password });

  const logout = async () => {
    // Clear storage contents and reset auth state
    setAuth({
      lastFetched: null,
      token: null,
      refreshToken: null,
    });
    await AsyncStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

// logger to check storage
export const logAuth = async () => {
  const authData = await AsyncStorage.getItem("auth");
  console.log(JSON.stringify(JSON.parse(authData || "{}"), null, 2));
};
