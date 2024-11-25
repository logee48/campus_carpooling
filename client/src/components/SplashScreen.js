  import React from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faCar } from "@fortawesome/free-solid-svg-icons";

  const SplashScreen = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
        {/* FontAwesome Icon */}
        <FontAwesomeIcon icon={faCar} className="text-6xl mb-4 animate-bounce" />
        <h1 className="text-4xl font-bold animate-fade">Welcome to Campus Carpooling</h1>
      </div>
    );
  };

  export default SplashScreen;
