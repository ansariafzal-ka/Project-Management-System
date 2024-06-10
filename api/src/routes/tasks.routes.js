const express = require("express");
const router = express.Router();

const authenticate = require("../config/auth");
const taskControllers = require("../controllers/tasks.controllers");

router.post("/new", authenticate, taskControllers.createTask);
router.get("/all-tasks", authenticate, taskControllers.sendProjectTasks);
router.get("/task-id=/:id", authenticate, taskControllers.getTask);
router.delete("/delete/:id", authenticate, taskControllers.deleteTask);
router.put("/edit/:id", authenticate, taskControllers.editTask);

module.exports = router;
