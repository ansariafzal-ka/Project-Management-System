import { Button, Label, Modal, TextInput } from "flowbite-react";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";

const NewTaskModal = ({ openModal, setOpenModal, id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:5000/api/v1/tasks/new",
        {
          project: id,
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setOpenModal(false);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              New Task
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label>Task Title</Label>
                </div>
                <TextInput
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label>Description</Label>
                </div>
                <TextInput
                  type="text"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="mt-3">
                Add New Task
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewTaskModal;
