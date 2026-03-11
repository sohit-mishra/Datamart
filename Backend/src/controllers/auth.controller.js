import authService from "../services/auth.service.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { removePassword } from "../utils/removePassword.js";
import jwt from "jsonwebtoken";


// LOGIN
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await authService.login(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: removePassword(user)
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};




export const signup = async (req, res) => {

  try {
    console.log()
    const { password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await authService.signup({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User created",
      data: removePassword(user)
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



export const getMe = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await authService.getMe(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      data: removePassword(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



export const updateUser = async (req, res) => {

  try {

   const id = req.user.id;
    const user = await authService.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated",
      data: removePassword(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};