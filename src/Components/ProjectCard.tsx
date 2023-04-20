import axios from "axios";
import { Project } from "../App";
import { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProjectCard = ({ _id, title, todos }: Project) => {
  const TODORef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // Show and hide the todos
  const handleClick = () => {
    const todosDiv = document.getElementById("todos" + _id);
    const plusDiv = document.getElementById("plus" + _id);
    const minusDiv = document.getElementById("minus" + _id);
    if (todosDiv) {
      todosDiv.classList.toggle("hidden");
      todosDiv.classList.toggle("flex");
      plusDiv?.classList.toggle("hidden");
      minusDiv?.classList.toggle("hidden");
    } else {
      console.log("Error: todosDiv is undefined");
    }
  };

  // Show and hide the edit card
  const editProject = () => {
    const editCard = document.getElementById("edit-card" + _id);
    if (editCard) {
      editCard.classList.toggle("hidden");
      editCard.classList.toggle("flex");
    } else {
      console.log("Error: editCard is undefined");
    }
    const projectCard = document.getElementById("project-card" + _id);
    if (projectCard) {
      projectCard.classList.toggle("hidden");
      projectCard.classList.toggle("flex");
    } else {
      console.log("Error: projectCard is undefined");
    }
  };

  // Delete a project
  const deleteProject = async () => {
    try {
      const response = await axios.post("/api/todos/delete/project", {
        _id: _id,
      });
      console.log(response.data.message);
      if (response.data.message === "Project deleted") {
        window.location.reload();
      } else {
        console.log("Error: window did not reload");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Add a new TODO
  const addTODO = async () => {
    try {
      await axios.post("/api/todos/add/todo", {
        _id: _id,
        TODO: TODORef.current!.value,
        description: descriptionRef.current!.value,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Remove a TODO
  const removeTODO = async (TODO: string, description: string) => {
    await console.log(TODO, description);
    try {
      const response = await axios.post("/api/todos/remove/todo", {
        _id: _id,
        TODO: TODO,
        description: description,
      });
      if (response.data.message === "TODO removed") {
        window.location.reload();
      } else {
        console.log("Error: window did not reload");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen">
      <div
        id={"project-card" + _id}
        className="flex flex-col bg-gray-200 w-1/2 my-5 items-center rounded-xl bg-opacity-30"
      >
        <h1 className="text-2xl text-black text-opacity-80 font-bold py-3">
          {title}
        </h1>

        <div id={"todos" + _id} className="hidden flex-col items-center">
          {todos ? (
            todos.map((todo) => (
              <div className="flex flex-col items-center my-2" key={todo.TODO}>
                <h1 className="text-gray-200 text-xl text-opacity-80 text-center">
                  {todo.TODO}
                </h1>
                <h1 className="bg-black bg-opacity-30 mx-10 py-1 px-2 text-gray-200 text-opacity-80 text-center rounded-md">
                  {todo.description}
                </h1>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-gray-200 text-opacity-80 text-center">
                This project does not have any TODOs
              </h1>
            </div>
          )}
          <button
            onClick={editProject}
            className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
          >
            Edit
          </button>
        </div>
        <div
          onClick={handleClick}
          className="bg-black pt-1 pb-0 px-10 cursor-pointer rounded-t-full bg-opacity-10 hover:bg-opacity-30 transition duration-100 ease-in-out"
        >
          <div id={"plus" + _id} className="">
            <AddIcon
              id="plus"
              className="text-2xl text-white text-opacity-50"
            />
          </div>
          <div id={"minus" + _id} className="hidden">
            <RemoveIcon className="hidden text-2xl text-white text-opacity-50" />
          </div>
        </div>
      </div>

      <div
        id={"edit-card" + _id}
        className="hidden flex-col bg-gray-200 w-1/2 my-5 items-center rounded-xl bg-opacity-30"
      >
        <div className="text-2xl text-black font-bold text-opacity-80 mt-5">
          Project Editor
        </div>
        {todos ? (
          todos.map((todo) => (
            <div key={todo.TODO} className="flex flex-col items-center my-2">
              <h1 className="text-gray-200 text-xl text-opacity-80 text-center">
                {todo.TODO}
              </h1>
              <h1 className="bg-black bg-opacity-30 mx-10 py-1 px-2 text-gray-200 text-opacity-80 text-center rounded-md">
                {todo.description}
              </h1>
              <button
                className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
                onClick={() => removeTODO(todo.TODO, todo.description)}
              >
                Remove TODO
              </button>
            </div>
          ))
        ) : (
          <div>
            <h1>No TODO's</h1>
          </div>
        )}

        <form
          onSubmit={addTODO}
          className="flex flex-col bg-black bg-opacity-30 mx-10 py-1 px-2 text-gray-200 text-opacity-80 text-center rounded-md lg:w-1/2"
        >
          <h1 className="text-white text-opacity-70 text-xl font-bold my-2">
            Add TODO
          </h1>
          <label className="text-white text-opacity-70 text-lg">TODO</label>
          <input
            className="mb-4 mt-1 mx-10 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            ref={TODORef}
            required
          ></input>
          <label className="text-white text-opacity-70 text-lg">
            Description
          </label>
          <input
            className="mb-4 mt-1 mx-10 py-1 px-2 bg-gray-200 bg-opacity-30 rounded-md"
            type="text"
            ref={descriptionRef}
            required
          ></input>
          <button
            type="submit"
            className="my-2 mb-5 mx-10 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
          >
            Add TODO
          </button>
        </form>
        <button
          onClick={deleteProject}
          className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
        >
          Delete Project
        </button>
        <button
          className="my-2 py-1 px-5 bg-black bg-opacity-30 rounded-lg text-white text-opacity-80 font-bold hover:bg-opacity-50 transition duration-100 ease-in-out"
          onClick={editProject}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
