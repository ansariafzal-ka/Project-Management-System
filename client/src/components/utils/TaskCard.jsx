import { React, useState } from "react";
import { Badge, Button, Card, Dropdown } from "flowbite-react";
import DeleteModal from "./DeleteModal";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  project_id,
  priority,
  dueDate,
  title,
  description,
  category,
  tags,
  createdAt,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.delete(
        `http://localhost:5000/api/v1/projects/delete/${project_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("");
      }
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="">
      <Card className="max-w-sm h-full">
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between items-center">
            <p
              className={`text-sm ${
                priority === "LOW"
                  ? "text-green-400"
                  : priority === "MEDIUM"
                  ? "text-yellow-400"
                  : priority === "HIGH"
                  ? "text-red-600"
                  : ""
              }`}
            >
              {priority} PRIORITY
            </p>
            <Dropdown inline>
              <Dropdown.Header>
                <span className="block text-sm font-medium">{title}</span>
              </Dropdown.Header>
              <Dropdown.Item
                className="text-yellow-400"
                onClick={() => {
                  navigate(`/home/projects/edit-project/${project_id}`, {
                    state: {
                      projectData: {
                        _id: project_id,
                        title: title,
                        description: description,
                        priority: priority,
                        category: category,
                        tags: tags,
                        dueDate: dueDate,
                      },
                    },
                  });
                }}
              >
                edit project
              </Dropdown.Item>
              <Dropdown.Item
                className="text-red-600"
                onClick={() => setOpenModal(true)}
              >
                delete project
              </Dropdown.Item>
            </Dropdown>
          </div>
          <p className="text-sm text-gray-500">
            created - {createdAt.toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
          <h1 className="text-xl font-medium">{title}</h1>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <div className="flex flex-col justify-start items-start border-t border-b py-2">
          <div className="flex flex-row justify-start items-start gap-2 mb-2">
            <Badge color="purple">{category}</Badge>
            <p className="text-sm text-red-600">
              due - {dueDate.toLocaleDateString("en-GB")}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-start items-start">
            {tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap">
          <Button
            color="gray"
            className="w-full"
            onClick={() => {
              navigate(`/home/projects/project-id=/${project_id}`);
            }}
          >
            OPEN PROJECT
          </Button>
        </div>
      </Card>
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default TaskCard;
