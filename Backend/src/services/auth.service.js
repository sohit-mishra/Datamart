import authRepository from "../repositories/auth.repository.js";

const login = async (email) => {
  const user = await authRepository.login(email);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const signup = async (data) => {
  const user = await authRepository.signup(data);
  return user;
};

const getMe = async (id) => {
  const user = await authRepository.getMe(id);
  return user;
};

const updateUser = async (id, data) => {
  const user = await authRepository.updateUser(id, data);
  return user;
};

export default {
  login,
  signup,
  getMe,
  updateUser
};