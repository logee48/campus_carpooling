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
    // <>
    //   <div className="home_page">
    //     <h4>
    //       {" "}
    //       Welcome <span>{username}</span>
    //     </h4>
    //     <button onClick={goto_rider}>rider</button>
    //     <button onClick={goto_driver}>driver</button>
    //     <button onClick={Logout}>LOGOUT</button>
    //   </div>
    // </>
    <div className="relative min-h-screen bg-background dark:bg-gray-900 text-white">
      {/* Logout Button */}
      <button
        onClick={Logout}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
      >
        Logout
      </button>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <h4 className="text-3xl font-bold">
          Welcome, <span className="text-primary">{username || "Guest"}</span>
        </h4>
        <div className="space-x-4">
          <button
            onClick={goto_rider}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Rider
          </button>
          <button
            onClick={goto_driver}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
