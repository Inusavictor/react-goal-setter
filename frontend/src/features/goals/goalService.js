import axios from 'axios';

const GOAL_URL = '/api/goals';
//Retrieve Goals
const getGoals = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.get(GOAL_URL, config);
  return res.data;
};

//Set Goals
const setGoal = async (goal, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.post(GOAL_URL, goal, config);
  return res.data;
};

//Delete Goal
const deleteGoal = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.delete(`${GOAL_URL}/${id}`, config);
  return res.data;
};
const goalService = { setGoal, getGoals, deleteGoal };
export default goalService;
