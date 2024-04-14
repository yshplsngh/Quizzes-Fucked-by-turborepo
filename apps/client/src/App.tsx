import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login.js";
import Landing from "./pages/Landing.js";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
}

export default App;
