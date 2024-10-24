import { useContext } from "react";
import { TasksDispatchContext } from "../../context/TasksContext";
import { EditSvg, TrashSvg } from "../SvgIcon/SvgIcon";

const ProjectCard = ({ task, onEdit }) => {
  const dispatch = useContext(TasksDispatchContext);
  let color;
  if (task.category === "To-Do") {
    color = "text-indigo-500";
  } else if (task.category === "On Progress") {
    color = "text-yellow-500";
  } else if (task.category === "Done") {
    color = "text-teal-500";
  } else {
    color = "text-rose-500";
  }
  return (
    <>
      <div key={task.id} className="mb-4 rounded-lg bg-gray-800 p-4">
        <div className="flex justify-between items-start">
          <h4 className={`mb-2 flex-1 font-semibold ${color} `}>
            {task.taskName}
          </h4>

          <div className="flex gap-2  ">
            <button
              className=""
              onClick={() =>
                dispatch({
                  type: "DELETE_TASK",
                  id: task.id,
                })
              }
            >
              <TrashSvg />
            </button>
            <button onClick={() => onEdit(task)}>
              <EditSvg />
            </button>
          </div>
        </div>
        <p className="mb-2 text-sm text-zinc-200">{task.description}</p>
        {/* Data formate month day year */}

        <p className="mt-6 text-xs text-zinc-400">
          {new Date(task.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </>
  );
};

export default ProjectCard;
