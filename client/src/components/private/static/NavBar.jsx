import { useState } from "react";
import { Button, Dropdown } from "flowbite-react";
import DeleteModal from "../../utils/DeleteModal";
import Cookies from "js-cookie";
import axios from "axios";

const NavBar = () => {
  const userData = JSON.parse(Cookies.get("user information"));
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user information");
    window.location.reload();
  };

  const handleDelete = async () => {
    console.log(userData.token);
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v1/users/delete/${userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      if (res.status === 202) {
        Cookies.remove("token");
        Cookies.remove("user information");
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <nav className="w-full h-[50px] p-8 bg-white flex flex-row justify-between items-center border-b">
      <h1>NAVBAR</h1>
      <div className="flex flex-row justify-center items-center gap-6">
        <Dropdown label={userData.name} inline>
          <Dropdown.Header>
            <span className="block text-sm">{userData.name}</span>
            <span className="block truncate text-sm font-medium">
              {userData.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Header>
            joined {new Date(userData.createdAt).toLocaleDateString("en-GB")}
          </Dropdown.Header>
          <Dropdown.Item
            className="text-red-600"
            onClick={() => setOpenModal(true)}
          >
            delete account
          </Dropdown.Item>
        </Dropdown>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <DeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleDelete={handleDelete}
      />
    </nav>
  );
};

export default NavBar;
