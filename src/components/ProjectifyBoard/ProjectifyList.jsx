import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { FilterSvg } from "../SvgIcon/SvgIcon";
import ProjectCard from "./ProjectCard";

const ProjectifyList = ({ onEdit, search }) => {
  // state for each category sorting
  const [sortedToDo, setSortedToDo] = useState("asc");
  const [sortedOnProgress, setSortedOnProgress] = useState("asc");
  const [sortedDone, setSortedDone] = useState("asc");
  const [sortedRevise, setSortedRevise] = useState("asc");

  const state = useContext(TasksContext);

  // filter the tasks
  const filteredTasks = state.filter((task) => {
    return task.taskName.toLowerCase().includes(search.toLowerCase());
  });

  // Toggle sort functions for each category
  const toggleSortToDo = () => {
    setSortedToDo((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const toggleSortOnProgress = () => {
    setSortedOnProgress((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const toggleSortDone = () => {
    setSortedDone((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const toggleSortRevise = () => {
    setSortedRevise((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Sort functions for each category
  const sortTasks = (tasks, sortOrder) => {
    return tasks.sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  };

  const todoCategory = sortTasks(
    filteredTasks.filter((task) => task.category === "To-Do"),
    sortedToDo
  );
  const onProgressCategory = sortTasks(
    filteredTasks.filter((task) => task.category === "On Progress"),
    sortedOnProgress
  );
  const doneCategory = sortTasks(
    filteredTasks.filter((task) => task.category === "Done"),
    sortedDone
  );
  const reviseCategory = sortTasks(
    filteredTasks.filter((task) => task.category === "Revise"),
    sortedRevise
  );

  return (
    <>
      <div className="-mx-2 mb-6 flex flex-wrap">
        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
          <div className="rounded-lg bg-indigo-600 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                To-Do ({todoCategory.length})
              </h3>
              <button onClick={toggleSortToDo}>
                <FilterSvg />
              </button>
            </div>
            <div>
              {todoCategory.length > 0 ? (
                todoCategory.map((task) => (
                  <ProjectCard key={task.id} task={task} onEdit={onEdit} />
                ))
              ) : (
                <p className="text-black">Task is Empty</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
          <div className="rounded-lg bg-yellow-500 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                On Progress ({onProgressCategory.length})
              </h3>
              <button onClick={toggleSortOnProgress}>
                <FilterSvg />
              </button>
            </div>
            {onProgressCategory.length > 0 ? (
              onProgressCategory.map((task) => (
                <ProjectCard key={task.id} task={task} onEdit={onEdit} />
              ))
            ) : (
              <p className="text-black">Task is Empty</p>
            )}
          </div>
        </div>

        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
          <div className="rounded-lg bg-teal-500 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Done ({doneCategory.length})
              </h3>
              <button onClick={toggleSortDone}>
                <FilterSvg />
              </button>
            </div>
            <div>
              {doneCategory.length > 0 ? (
                doneCategory.map((task) => (
                  <ProjectCard key={task.id} task={task} onEdit={onEdit} />
                ))
              ) : (
                <p className="text-black">Task is Empty</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
          <div className="rounded-lg bg-rose-500 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Revise ({reviseCategory.length})
              </h3>
              <button onClick={toggleSortRevise}>
                <FilterSvg />
              </button>
            </div>
            {reviseCategory.length > 0 ? (
              reviseCategory.map((task) => (
                <ProjectCard key={task.id} task={task} onEdit={onEdit} />
              ))
            ) : (
              <p className="text-black">Task is Empty</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectifyList;
