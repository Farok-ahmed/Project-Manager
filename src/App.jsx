import { useReducer, useState } from "react";
import Header from "./components/Header";
import ProjectBoard from "./components/ProjectifyBoard/ProjectBoard";
import Sidebar from "./components/Sidebar";
import { TasksContext, TasksDispatchContext } from "./context/TasksContext";
import { initialTasks } from "./data/tasks";
import { TaskReducer } from "./reducer/TaskReducer";

const App = () => {
  const [state, dispatch] = useReducer(TaskReducer, initialTasks);
  const [search, setSearch] = useState("");

  const handleQuery = (query) => {
    setSearch(query);
  };
  return (
    <>
      <TasksContext.Provider value={state}>
        <TasksDispatchContext.Provider value={dispatch}>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden">
              <Header search={search} onSearch={handleQuery} />
              <ProjectBoard search={search} />
            </main>
          </div>
        </TasksDispatchContext.Provider>
      </TasksContext.Provider>
    </>
  );
};

export default App;
