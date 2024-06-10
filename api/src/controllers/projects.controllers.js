const Project = require("../models/projects.models");
const projectControllers = {
  createProject: async (req, res) => {
    const { title, description, priority, category, tags, dueDate } = req.body;

    try {
      const newProject = await Project.create({
        user: req.user,
        title: title,
        description: description,
        priority: priority,
        category: category,
        tags: tags,
        dueDate: dueDate,
        tasks: [],
      });

      res.status(201).json({
        message: "project created successfully",
        project_details: newProject,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error creating project" });
    }
  },

  sendUserProjects: async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user });
      res.status(200).json({ message: "All Projects", projects: projects });
    } catch (error) {
      res.status(500).json({ message: "error sending projects" });
    }
  },

  sendProject: async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      res
        .status(200)
        .json({ message: "project send successfully", project: project });
    } catch (error) {
      res.status(500).json({ message: "error sending project" });
    }
  },

  editProject: async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, category, tags, dueDate } = req.body;

    try {
      await Project.findByIdAndUpdate(id, {
        title: title,
        description: description,
        priority: priority,
        category: category,
        tags: tags,
        dueDate: dueDate,
        tasks: [],
      });
      res.status(201).json({ message: "Project edited successfully" });
    } catch (error) {
      res.status(500).json({ message: "error editing project" });
    }
  },

  deleteProject: async (req, res) => {
    const { id } = req.params;
    try {
      await Project.findByIdAndDelete(id);
      res.status(200).json({ message: "project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "error deleting project" });
    }
  },
};

module.exports = projectControllers;
