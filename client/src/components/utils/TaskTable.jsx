import { Button } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";
import EditTaskModal from "./EditTaskModal";

const TaskTable = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      const token = Cookies.get("token");
      await axios.delete(
        `http://localhost:5000/api/v1/tasks/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            projectId: id,
          },
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        "http://localhost:5000/api/v1/tasks/all-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            projectId: id,
          },
        }
      );
      setTasks(response.data.tasks);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      {tasks.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Task Title
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Task Description
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                  {new Date(task.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{task.title}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {task.description}
                </td>
                <td className="px-4 py-4 flex flex-row gap-2">
                  <Button
                    color="failure"
                    onClick={() => {
                      setTaskId(task._id);
                      setOpenModal(true);
                    }}
                  >
                    <FaTrash />
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => {
                      setTaskId(task._id);
                      setEditModal(true);
                    }}
                  >
                    <FaEdit />
                  </Button>
                </td>
                <EditTaskModal
                  openModal={editModal}
                  setOpenModal={setEditModal}
                  editTitle={task.title}
                  editDescription={task.description}
                  id={taskId}
                />
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full">
          <h1 className="text-xl font-medium">No tasks</h1>
        </div>
      )}
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default TaskTable;
