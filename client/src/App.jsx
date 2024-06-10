import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/private/PrivateRoutes";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/private/pages/Home";
import NewProject from "./components/private/pages/sub pages/NewProject";
import Projects from "./components/private/pages/Projects";
import AllProjects from "./components/private/pages/sub pages/AllProjects";
import EditProject from "./components/private/pages/sub pages/EditProject";
import SingleProject from "./components/private/pages/sub pages/SingleProject";

const App = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />}>
              <Route path="projects" element={<Projects />}>
                <Route path="all-projects" element={<AllProjects />} />
                <Route path="new-project" element={<NewProject />} />
                <Route path="edit-project/:id" element={<EditProject />} />
                <Route path="project-id=/:id" element={<SingleProject />} />
              </Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
