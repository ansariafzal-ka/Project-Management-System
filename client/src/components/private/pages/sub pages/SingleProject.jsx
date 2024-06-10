import { Badge } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import TaskTable from "../../../utils/TaskTable";
import NewTaskModal from "../../../utils/NewTaskModal";

const SingleProject = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchProject = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:5000/api/v1/projects/project-id=/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjectData(response.data.project);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <section className="w-full h-full">
      {projectData ? (
        <div className="bg-white p-5 flex flex-col justify-start items-start gap-y-3 rounded-lg max-h-[550px] overflow-auto">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="flex flex-col justify-start items-start gap-1">
              <p
                className={`text-sm ${
                  projectData.priority === "LOW"
                    ? "text-green-400"
                    : projectData.priority === "MEDIUM"
                    ? "text-yellow-400"
                    : projectData.priority === "HIGH"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {projectData.priority} PRIORITY
              </p>
              <p className="text-sm text-gray-500">
                created -
                {new Date(projectData.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <Link
              to={"/home/projects/all-projects"}
              className="border p-2 rounded-lg font-medium hover:bg-gray-200 duration-100"
            >
              All Projects
            </Link>
          </div>
          <h1 className="text-2xl font-medium">{projectData.title}</h1>
          <p className="text-gray-500 font-normal text-lg">
            {projectData.description}
          </p>
          <div className="w-full flex flex-col justify-start items-start border-t border-b py-3">
            <div className="flex flex-row justify-start items-start gap-2 mb-3">
              <Badge color={"purple"}>WORK</Badge>
              <p className="text-sm text-red-600">
                due -{new Date(projectData.dueDate).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="flex flex-row justify-start items-start gap-2">
              <div className="flex flex-row gap-2 justify-start items-start">
                {projectData.tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-row justify-between items-center mb-3">
              <h1 className="text-lg font-medium">All Tasks</h1>
              <button
                onClick={() => setOpenModal(true)}
                className="border p-2 rounded-lg font-medium hover:bg-gray-200 duration-100"
              >
                New Task
              </button>
            </div>
            <TaskTable id={id} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <NewTaskModal openModal={openModal} setOpenModal={setOpenModal} id={id} />
    </section>
  );
};

export default SingleProject;
