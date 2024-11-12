import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:1234",
        {},
        { withCredentials: true }
      );
      const { user } = data;
      // here we check whether user is logged in or not, if not it nav to /login
      setUsername(user);
      if(!user){
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  const goto_driver = () => {
    navigate("/driver");
  }
  const goto_rider = () => {
    navigate("/rider");
  }
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={goto_rider}>rider</button>
        <button onClick={goto_driver}>driver</button>
        <button onClick={Logout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Home;
