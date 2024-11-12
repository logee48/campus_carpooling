import { Route, Routes } from "react-router-dom";
import { Login, Signup, Driver1, Rider } from "./pages";
import Home from "./pages/Home";

function App() {
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