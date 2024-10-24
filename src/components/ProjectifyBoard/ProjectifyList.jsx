import { useContext, useState } from "react";
import { TasksContext } from "../../context/TasksContext";
import { FilterSvg } from "../SvgIcon/SvgIcon";
import ProjectCard from "./ProjectCard";

const ProjectifyList = ({ onEdit, search }) => {
  const [sortedTasks, setSortedTasks] = useState("asc");
  const state = useContext(TasksContext);

  // toggle sort
  const toggleSort = () => {
    setSortedTasks((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  // filter the tasks
  const filteredTasks = state.filter((task) => {
    return task.taskName.toLowerCase().includes(search.toLowerCase());
  });

  // sort the tasks by date

  const sortedOrder = filteredTasks.sort((a, b) => {
    if (sortedTasks === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const todoCategory = sortedOrder.filter((task) => task.category === "To-Do");
  const onProgressCategory = sortedOrder.filter(
    (task) => task.category === "On Progress"
  );
  const doneCategory = sortedOrder.filter((task) => task.category === "Done");
  const reviseCategory = sortedOrder.filter(
    (task) => task.category === "Revise"
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
              <button onClick={toggleSort}>
                <FilterSvg />
              </button>
            </div>
            <div>
              {/* todo empty or has */}
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
              <button onClick={toggleSort}>
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
              <FilterSvg />
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
              <FilterSvg />
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
