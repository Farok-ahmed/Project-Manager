import { useContext, useState } from "react";
import { TasksDispatchContext } from "../../context/TasksContext";

const AddProject = ({ onClose, editTask }) => {
  const [task, setTask] = useState(
    editTask || {
      id: crypto.randomUUID(),
      taskName: "",
      description: "",
      date: "",
      category: "To-Do",
    }
  );
  const dispatch = useContext(TasksDispatchContext);
  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTask) {
      dispatch({ type: "EDIT_TASK", task });
    } else {
      dispatch({ type: "ADD_TASK", task });
    }
    onClose();

    setTask({
      taskName: "",
      description: "",
      date: "",
      category: "",
    });
  };
  // handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  return (
    <>
      <div className="p-4 bg-gray-900 h-full w-full absolute top-0 left-0 z-10 bg-opacity-70"></div>
      <div className="w-full max-w-md rounded-lg bg-gray-800 z-10 shadow-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            Create Task
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                value={task.taskName}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={task.description}
                onChange={handleChange}
                rows="3"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="date"
                value={task.date}
                onChange={handleChange}
                name="date"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={task.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="To-Do">To-Do</option>
                <option value="On Progress">On Progress</option>
                <option value="Done">Done</option>
                <option value="Revise">Revised</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {editTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
