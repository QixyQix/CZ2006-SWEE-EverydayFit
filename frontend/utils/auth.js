import React, { useContext, useState, createContext, useEffect } from "react";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    lastFetched: null,
    token: null,
    refreshToken: null,
  });
  const [exercises, setExercises] = useState("");
  // TODO Add a loading screen while fetching the stored data
  const [isLoading, setIsLoading] = useState(true);
  // Load saved auth every time the app is opened
  useEffect(() => {
    loadSavedAuth();
  }, []);
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
  
  const getPlan = async (date) => {
    const token = auth.token;
    const res = await axios.get(`${API_URL}/plan/${date}`, { 
      headers: {
      'Authorization': `${token}`
      }
    })
    if (res.status == 200) {
      return res.data;
    } else {
      throw res.data;
    } 
  };
  const setPlan = async (props, values) => {
    const token = auth.token;
    const date = `${props.date.year}-${('0' +props.date.month).slice(-2)}-${('0' + props.date.date).slice(-2)}`;
    const res = await axios.post(`${API_URL}/plan/${date}/activity/`,  
    {
      "exerciseID": props._id,
      "quantity": values.quantity,
      "sets": values.sets
     }, 
     { 
      headers: {
      'authorization': `${token}`
      }, 
    })
    //console.log(date);
  };
  const patchPlan = async (date, values) => {
    const token = auth.token;
    console.log(date, values);
    try {
      const res = await axios.patch(`${API_URL}/plan/${date}/activity/`, 
      {
        "activityID": values._id,
        "exerciseID": values.exerciseID,
        "quantity": values.totalQuantity,
        "sets": values.sets,
        "done": values.done
      },
      { 
        headers: {
        'authorization': `${token}`
        },
      })
    } catch (e)
      {
        console.log("An error: patching");
      }  
  }
  const deletePlan = async (date, exerciseInfo) => {
    const token = auth.token;
    const activityID = exerciseInfo;
    try {
      const res = await axios.delete(`${API_URL}/plan/${date}/activity/`, 
      { 
        headers: {
        'authorization': `${token}`
        },
        data : {
          "activityID": activityID
        },
      })
    } catch (e)
      {
        console.log("An error: AUTISM");
      }  
  }
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
    <AuthContext.Provider value={{ auth, isLoading, login, register, logout, getPlan, setPlan, deletePlan, patchPlan }}>
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