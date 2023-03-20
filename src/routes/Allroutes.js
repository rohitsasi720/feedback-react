import { Routes, Route } from "react-router-dom";
import { Register, Login, Dashboard, Feedback, PageNotFound } from "../pages";


export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
