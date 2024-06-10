const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },
  category: {
    type: String,
    enum: ["PERSONAL", "WORK", "EDUCATION"],
    default: "PERSONAL",
    required: true,
  },
  tags: [String],

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.createdAt;
      },
      message: "Due date must be after creation date",
    },
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);
