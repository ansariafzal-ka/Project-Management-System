const express = require("express");
const router = express.Router();

const projectControllers = require("../controllers/projects.controllers");
const authenticate = require("../config/auth");

router.post("/new", authenticate, projectControllers.createProject);
router.put("/edit/:id", authenticate, projectControllers.editProject);
router.delete("/delete/:id", authenticate, projectControllers.deleteProject);
router.get("/all-projects", authenticate, projectControllers.sendUserProjects);
router.get("/project-id=/:id", authenticate, projectControllers.sendProject);

module.exports = router;
