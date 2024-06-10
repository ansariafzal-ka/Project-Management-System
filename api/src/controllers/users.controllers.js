const User = require("../models/users.models");
const Project = require("../models/projects.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userControllers = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (user) {
        return res
          .status(409)
          .json({ message: "This email is  already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "error creating user" });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error in logging user" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }
      await User.findByIdAndDelete(id);
      await Project.deleteMany({ user: id });
      res.status(202).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "error deleting user" });
    }
  },

  editUser: async (req, res) => {
    const { name, password } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ message: "No user with this id" });
      }
      await User.findByIdAndUpdate(id, { name: name, password: password });
      res.status(202).json({ message: "User edited successfully" });
    } catch (error) {
      res.status(500).json({ message: "error editing user" });
    }
  },
};

module.exports = userControllers;
