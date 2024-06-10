import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Datepicker,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

import axios from "axios";
import Cookies from "js-cookie";

const NewProject = () => {
  const [newTag, setNewTag] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [category, setCategory] = useState("PERSONAL");
  const [tags, setTags] = useState([]);
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    console.log("Form submitted with data:", {
      title,
      description,
      priority,
      category,
      tags,
      dueDate,
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/projects/new",
        {
          title: title,
          description: description,
          priority: priority,
          category: category,
          tags: tags,
          dueDate: dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
    navigate("/home/projects/all-projects");
  };

  return (
    <section className="w-full h-full bg-white p-5 rounded-lg">
      <div className="w-full flex flex-row justify-between items-center mb-4">
        <h1 className="text-xl font-medium">New Project</h1>
        <Link
          to={"/home/projects/all-projects"}
          className="border p-2 rounded-lg font-medium hover:bg-gray-200 duration-100"
        >
          All Projects
        </Link>
      </div>
      <div className="w-full max-h-[450px] p-5">
        <form className="flex flex-row gap-4" onSubmit={handleFormSubmit}>
          <div className="w-[70%] flex flex-col gap-3">
            <Label>Project Title</Label>
            <TextInput
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Label>Project Description</Label>
            <Textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex gap-4">
              <div className="w-full">
                <Label>Priority</Label>
                <Select
                  className="mt-2"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </Select>
              </div>
              <div className="w-full">
                <Label>Category</Label>
                <Select
                  className="mt-2"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="PERSONAL">PERSONAL</option>
                  <option value="WORK">WORK</option>
                  <option value="EDUCATION">EDUCATION</option>
                </Select>
              </div>
            </div>
            <Label>#tags</Label>
            <div className="flex flex-col justify-start items-start">
              <div className="w-full flex flex-row justify-center items-center gap-2 mb-4">
                <TextInput
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="eg. hobbies"
                  className="w-full"
                />
                <Button
                  color="gray"
                  onClick={() => {
                    newTag && setTags([...tags, newTag]);
                    setNewTag("");
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-row gap-2 justify-start items-start">
                {tags.map((tag, index) => (
                  <Badge key={index}>{tag}</Badge>
                ))}
              </div>
            </div>
            <Button type="submit" className="mt-2">
              Create Project
            </Button>
          </div>
          <div>
            <Datepicker
              title="Due Date"
              inline
              onSelectedDateChanged={(date) => setDueDate(date)}
              className="border rounded-lg"
              required
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewProject;
