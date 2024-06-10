import { Link, useNavigate } from "react-router-dom";
import { PiFlowerTulipBold } from "react-icons/pi";
import { Button, TextInput } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/login", {
        email: email,
        password: password,
      });

      if (res.status === 201) {
        Cookies.set("token", res.data.token, { expires: 1 });
        Cookies.set("user information", JSON.stringify(res.data), {
          expires: 1,
        });
        navigate("/home/projects/all-projects");
      }
    } catch (error) {
      console.log("Error : ", error);
      setError(true);
    }
  };

  return (
    <div className="bg-white w-[450px] p-10 flex flex-col justify-center items-center gap-y-4 rounded">
      <PiFlowerTulipBold className="text-4xl text-[#0e7490]" />
      <h1 className="font-bold text-2xl">Login to your account</h1>
      <p className="text-xs font-medium text-gray-500">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-[#0e7490] hover:underline">
          register
        </Link>
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center gap-y-4"
      >
        <TextInput
          type="email"
          placeholder="Email"
          className="w-full"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <TextInput
          type={"password"}
          placeholder="Password"
          className="w-full"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && (
          <div>
            <p className="text-red-500">Invalid credentials</p>
          </div>
        )}
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
