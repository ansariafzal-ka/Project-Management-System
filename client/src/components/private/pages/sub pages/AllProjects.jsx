import { Link } from "react-router-dom";
import TaskCard from "../../../utils/TaskCard";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "http://localhost:5000/api/v1/projects/all-projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data.projects);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full h-full">
      <div className="bg-white p-5 flex flex-col justify-start items-start gap-y-3 rounded-lg max-h-[550px] overflow-auto">
        <div className="w-full flex flex-row justify-between items-center mb-4">
          <h1 className="text-xl font-medium">All Projects</h1>
          <Link
            to={"/home/projects/new-project"}
            className="border p-2 rounded-lg font-medium hover:bg-gray-200 duration-100"
          >
            Create Project
          </Link>
        </div>
        <div className="w-full max-h-[540px] grid grid-cols-3 gap-4 overflow-auto">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <TaskCard
                key={index}
                project_id={project._id}
                title={project.title}
                description={project.description}
                category={project.category}
                tags={project.tags}
                priority={project.priority}
                dueDate={new Date(project.dueDate)}
                createdAt={new Date(project.createdAt)}
              />
            ))
          ) : (
            <div className="w-full">
              <h1 className="text-xl font-medium">No Projects</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllProjects;
