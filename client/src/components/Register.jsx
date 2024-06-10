import { Link, useNavigate } from "react-router-dom";
import { PiFlowerTulipBold } from "react-icons/pi";
import axios from "axios";
import { useState } from "react";
import { Button, TextInput } from "flowbite-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log(res.data);
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error : ", error);
      setError(true);
    }
  };

  return (
    <div className="bg-white w-[450px] p-10 flex flex-col justify-center items-center gap-y-4 rounded">
      <PiFlowerTulipBold className="text-4xl text-[#0e7490]" />
      <h1 className="font-bold text-2xl">Register to create an account</h1>
      <p className="text-xs font-medium text-gray-500">
        Don't have an account yet?{" "}
        <Link to="/login" className="text-[#0e7490] hover:underline">
          login
        </Link>
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center gap-y-4"
      >
        <TextInput
          type="text"
          placeholder="Name"
          className="w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
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
        <TextInput
          type={"password"}
          placeholder="Confirm password"
          className="w-full"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        {error && (
          <div>
            <p className="text-red-500">User already exists</p>
          </div>
        )}
        {password !== confirmPassword &&
          password != "" &&
          confirmPassword !== "" && (
            <p className="text-red-500">Passwords don't match</p>
          )}
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
