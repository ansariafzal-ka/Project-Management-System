import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuthenticated = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const res = await axios.post(
            "http://localhost:5000/api/v1/users/verifyToken",
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 200) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.log("Error verifying token: ", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuthenticated();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
