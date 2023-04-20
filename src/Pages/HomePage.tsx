import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Project } from "../App";
import ProjectCard from "../Components/ProjectCard";
import { useSignOut } from "react-auth-kit";

type ProjectListProps = {
  projects: Project[];
};

const HomePage = ({ projects }: ProjectListProps) => {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleSignOut = () => {
    navigate("/login");
    window.location.reload();
    signOut();
    localStorage.removeItem("TODO-email");
  };

  // Filter projects by title
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      return (
        title === "" ||
        project.title.toLowerCase().includes(title.toLowerCase())
      );
    });
  }, [title, projects]);

  return (
    <div>
      <div id="up" className="z-10"></div>
      <div id="down" className="z-10"></div>
      <div id="left" className="z-10"></div>
      <div id="right" className="z-10"></div>
      <div className="flex flex-col justify-center items-center min-h-screen min-w-full bg-black bg-opacity-60 absolute z-20">
        <div className="flex flex-col justify-center items-center w-4/5 my-12 py-10 rounded-xl bg-gray-200 bg-opacity-10">
          <h1 className="text-4xl text-gray-200 text-opacity-80 font-bold mt-5 mb-5 py-1 px-10 rounded-md border-2 border-gray-200 border-opacity-80">
            My Dashboard
          </h1>
          <Link
            className="bg-black bg-opacity-40 my-5 py-2 px-8 rounded-lg text-gray-200 text-opacity-80 text-xl font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
            to="/new"
          >
            Create New Project
          </Link>
          <div className="flex flex-col items-center mt-5">
            <h1 className="text-xl font-bold text-gray-200 text-opacity-80 my-2">
              Filter Projects
            </h1>
            <form className="flex flex-col items-center">
              <input
                className="py-0.5 px-2 rounded-md bg-white bg-opacity-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </form>
          </div>
          {filteredProjects ? (
            filteredProjects.map((project) => (
              <div key={project._id}>
                <ProjectCard
                  _id={project._id}
                  title={project.title}
                  todos={project.todos}
                />
              </div>
            ))
          ) : (
            <div>You do not have any projects</div>
          )}
          <button
            className="bg-black bg-opacity-40 text-xl text-gray-200 text-opacity-80 my-10 py-2 px-8 rounded-lg font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
