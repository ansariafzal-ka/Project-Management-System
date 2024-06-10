const Task = require("../models/tasks.models");

const taskControllers = {
  createTask: async (req, res) => {
    const { project, title, description } = req.body;

    try {
      await Task.create({
        project: project,
        title: title,
        description: description,
      });
      res.status(201).json({ message: "Task added successfully" });
    } catch (error) {
      res.status(500).json({ message: "error creating task", error: error });
    }
  },

  sendProjectTasks: async (req, res) => {
    try {
      const projectId = req.query.projectId;
      const tasks = await Task.find({ project: projectId });
      res
        .status(200)
        .json({ message: "tasks send successfully", tasks: tasks });
    } catch (error) {
      res.status(500).json({ message: "error creating task" });
    }
  },

  getTask: async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      res.status(200).json({ message: "Task send successfully", task: task });
    } catch (error) {
      res.status(500).json({ message: "error getting task" });
    }
  },

  editTask: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
      await Task.findByIdAndUpdate(id, {
        title: title,
        description: description,
      });
      res.status(200).json({ message: "task edited successfully" });
    } catch (error) {
      res.status(500).json({ message: "error creating task" });
    }
  },

  deleteTask: async (req, res) => {
    const { id } = req.params;

    try {
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: "task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "error creating task" });
    }
  },
};

module.exports = taskControllers;
