import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NewProject = () => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const TODORef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // Create new project
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/todos/add/project",
        {
          email: localStorage.getItem("TODO-email") || "",
          title: titleRef.current!.value,
          TODO: TODORef.current!.value,
          description: descriptionRef.current!.value,
        },
        config
      );

      navigate("/");

      if (response.data.message === "Project created") {
        window.location.reload();
      } else {
        console.log("Error: window did not reload");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-black bg-opacity-60 absolute z-20">
        <h1 className="text-3xl text-white font-bold text-opacity-80 my-5">
          New Project
        </h1>
        <form
          className="flex flex-col items-center py-8 px-16 mb-24 w-72 bg-gray-200 bg-opacity-20 rounded-lg lg:w-1/4"
          onSubmit={handleSubmit}
        >
          <label className="text-white text-opacity-70 text-lg">Title</label>
          <input
            className="mb-4 mt-1 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            ref={titleRef}
            required
          ></input>

          <label className="text-white text-opacity-70 text-lg">TODO's</label>
          <input
            className="mb-4 mt-1 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            ref={TODORef}
            required
          ></input>

          <label className="text-white text-opacity-70 text-lg">
            Description
          </label>
          <input
            className="mb-4 mt-1 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            ref={descriptionRef}
            required
          ></input>

          <button
            className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold  hover:bg-opacity-50 transition duration-100 ease-in-out"
            type="submit"
          >
            Save
          </button>
          <Link to="..">
            <button
              className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold  hover:bg-opacity-50 transition duration-100 ease-in-out"
              type="submit"
            >
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
