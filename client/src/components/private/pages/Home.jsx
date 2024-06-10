import { Outlet } from "react-router-dom";
import SideBar from "../static/SideBar";
import NavBar from "../static/NavBar";

const Home = () => {
  return (
    <section className="w-full h-screen flex">
      <SideBar />
      <div className="w-full h-screen">
        <NavBar />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Home;
