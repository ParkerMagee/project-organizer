import axios from "axios";
import { useEffect, useState } from "react";
import { RequireAuth } from "react-auth-kit";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import NewProject from "./Pages/NewProject";
import Register from "./Pages/Register";

export type Project = {
  _id: string;
} & ProjectData;

export type ProjectData = {
  title: string;
  todos: todos[];
};

export type todos = {
  TODO: string;
  description: string;
};

axios.defaults.baseURL = "https://project-organizer-api.onrender.com";

function App() {
  // Retrieve projects from MongoDB
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/todos/retrieve", {
          params: {
            email: localStorage.getItem("TODO-email") || "",
          },
        });
        setProjects(response.data.projects);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <RequireAuth loginPath="/login">
            <HomePage projects={projects} />
          </RequireAuth>
        }
      />
      <Route path="/new" element={<NewProject />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
