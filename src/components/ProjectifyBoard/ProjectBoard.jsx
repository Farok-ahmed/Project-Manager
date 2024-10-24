import { useState } from "react";
import AddProject from "./AddProject";
import ProjectAction from "./ProjectAction";
import ProjectifyList from "./ProjectifyList";

const ProjectBoard = ({ search }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // handleShow Modal
  const handleShowModal = () => {
    setShowModal(true);
  };
  // handleClose Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTask(null);
  };

  //handleEdit Task
  const handleEditTask = (task) => {
    setEditingTask(task);
    handleShowModal();
  };

  return (
    <>
      {showModal && (
        <AddProject onClose={handleCloseModal} editTask={editingTask} />
      )}
      <div className="mx-auto max-w-7xl p-6">
        <ProjectAction onShow={handleShowModal} />

        <ProjectifyList onEdit={handleEditTask} search={search} />
      </div>
    </>
  );
};

export default ProjectBoard;
