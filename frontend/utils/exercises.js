import { API_URL } from "@env";
import axios from "axios";

export const getExercises = async () => {
  const res = await axios.get(`${API_URL}/exercise`);
  return res.data;
};

