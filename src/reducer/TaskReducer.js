export const TaskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.task];
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.task.id ? action.task : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.id);
  }
};
