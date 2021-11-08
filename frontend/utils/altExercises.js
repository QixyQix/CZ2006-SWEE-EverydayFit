import { API_URL } from "@env";
import axios from "axios";


export const getAltExercises = async (exerciseID) => {
    const res = await axios.get(`${API_URL}/exercise/alt/${exerciseID}`)
    return res.data;
  };