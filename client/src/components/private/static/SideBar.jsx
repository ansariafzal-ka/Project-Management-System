import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTasks, FaCheckCircle } from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  const sideBarLink = [
    {
      title: "Projects",
      icon: <FaTasks />,
      link: "/home/projects/all-projects",
    },
  ];

  const setActiveLinkBasedOnURL = () => {
    const foundLink = sideBarLink.find(
      (item) => item.link === location.pathname
    );
    if (foundLink) {
      setActiveLink(foundLink);
    }
  };

  useEffect(() => {
    setActiveLinkBasedOnURL();
  }, [location.pathname]);

  return (
    <section className="bg-white w-[300px] h-screen border-r">
      <div>
        <div className="flex justify-center items-center gap-2 p-8 h-[50px] border-b">
          <FaCheckCircle className="text-[18px] text-lime-500" />
          <h1 className="text-xl font-medium">Task Manager</h1>
        </div>
        <ul className="p-4 flex flex-col gap-y-2">
          {sideBarLink.map((val, key) => {
            return (
              <li key={key}>
                <Link
                  to={val.link}
                  className={`cursor-pointer flex items-center gap-2 font-medium p-2 rounded hover:bg-[#0e7490] hover:text-white duration-75 ${
                    activeLink && activeLink.link === val.link
                      ? "bg-[#0e7490] text-white"
                      : ""
                  }`}
                >
                  <div>{val.icon}</div>
                  <div>{val.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
