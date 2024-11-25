import React, { useState,useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Signup, Driver1, Rider } from "./pages";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timeout on unmount
  }, []);

  // Render the splash screen if it is still visible
  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/driver" element={<Driver1 />} />
        <Route path="/rider" element={<Rider />} />
      </Routes>
    </div>
  );
}

export default App;