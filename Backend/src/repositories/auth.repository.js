import supabase from "../config/supabase.config.js";

const login = async (email) => {
  const { data,error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (error) throw error;
  return data;
};

const signup = async (user) => {
  const { data, error } = await supabase
    .from("users")
    .insert(user)
    .select()
    .single();
  if (error) throw error;
  return data;
};

const getMe = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

const updateUser = async (id, user) => {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export default {
  login,
  signup,
  getMe,
  updateUser
};