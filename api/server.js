require("dotenv").config();
const express = require("express");
const connectDb = require("./src/config/mongodb");
const app = express();

const cors = require("cors");

const userRouter = require("./src/routes/users.routes");
const projectRouter = require("./src/routes/projects.routes");
const taskRouter = require("./src/routes/tasks.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);

connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
