import React, { useState } from "react";
import "./task.css";
import { MoreVertical } from "lucide-react";
import AddTaskModal from "./addTask/addTask";

const Task = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const tasks = [
    {
      id: 1,
      date: "2/02/2024 2:00 pm",
      task: "Design Navaratri poster",
      description:
        "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
    },
    {
      id: 2,
      date: "2/02/2024 2:00 pm",
      task: "Design Navaratri poster",
      description:
        "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
    },
    {
      id: 3,
      date: "2/02/2024 2:00 pm",
      task: "Design Navaratri poster",
      description:
        "Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero",
    },
  ];

  const handleDropdownToggle = (taskId) => {
    setActiveDropdown(activeDropdown === taskId ? null : taskId);
  };
  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };
  const handleEdit = (taskId) => {
    console.log("Edit task:", taskId);
    setActiveDropdown(null);
  };

  const handleDelete = (taskId) => {
    console.log("Delete task:", taskId);
    setActiveDropdown(null);
  };

  const handleOutsideClick = () => {
    setActiveDropdown(null);
  };
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Update existing task
      //   setTasks(
      //     tasks.map((task) => (task.id === editingTask.id ? taskData : task))
      //   );
    } else {
      // Add new task
      //   setTasks([...tasks, taskData]);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  return (
    <div className="task_container">
      <p className="task_header">Tasks Management</p>
      <div className="task_header_btn">
        <button className="add-task-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </div>
      <div className="task_table_container">
        {/* Mobile Card Layout */}
        <div className="mobile-task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-card-header">
                <h3 className="task-title">{task.task}</h3>
                <div className="action-container">
                  <button
                    className="action-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownToggle(task.id);
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {activeDropdown === task.id && (
                    <div className="action-dropdown">
                      <button
                        className="dropdown-item"
                        onClick={() => handleEdit(task.id)}
                      >
                        ✓ Edit
                      </button>
                      <button
                        className="dropdown-item delete"
                        onClick={() => handleDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              <p className="task-date">{task.date}</p>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <table className="task-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Date & Time</th>
              <th>Task</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td className="task-number">
                  <div className="number-badge">{task.id}</div>
                </td>
                <td className="task-date">{task.date}</td>
                <td className="task-name">{task.task}</td>
                <td className="task-description">{task.description}</td>
                <td className="task-action">
                  <div className="action-container">
                    <button
                      className="action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(task.id);
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeDropdown === task.id && (
                      <div className="action-dropdown">
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(task.id)}
                        >
                          ✓ Edit
                        </button>
                        <button
                          className="dropdown-item delete"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        editData={editingTask}
      />
    </div>
  );
};
export default Task;
