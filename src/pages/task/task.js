import React, { useContext, useEffect, useState } from "react";
import "./task.css";
import { MoreVertical } from "lucide-react";
import AddTaskModal from "./addTask/addTask";
import { AppContext } from "../../context/context";
import { apiList } from "../../context/apiList";
import { action } from "../../context/action";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
const Task = () => {
  const [loading, setLoading] = useState(true);
  const {
    apiPOSTMethod,
    state: { GetAllTask },
  } = useContext(AppContext);
  const [selectedData, setSelectedData] = useState(null);
  const [openCard, setOpenCard] = useState(false);
  const GetAllTaskStatus = GetAllTask?.code && GetAllTask?.code === 200;

  const handleOutsideClick = () => {
    // setSelectedData(null);
  };
  const handleAddTask = () => {
    setSelectedData(null);
    setOpenCard(true);
  };

  useEffect(() => {
    apiPOSTMethod(apiList?.GetAllTask, {}, action?.GetAllTask).then((res) => {
      setLoading(false);
    });
  }, []);
  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleDelete = (id) => {
    apiPOSTMethod(apiList?.deleteData, { taskId: id }).then((res) => {
      setSelectedData(null);
      apiPOSTMethod(apiList?.GetAllTask, {}, action?.GetAllTask).then(
        (res) => {}
      );
    });
  };
  const navigate = useNavigate();
  const logoutClick = (e) => {
    localStorage.removeItem("lemonpaytoken");
    navigate("/login");
  };
  return (
    <div className="task_container">
      <p className="task_header">Tasks Management</p>
      <div className="task_header_btn">
        <button onClick={handleAddTask} className="task_header_btn_add">
          + Add Task
        </button>
        <button className="task_header_btn_logout" onClick={logoutClick}>
          Log Out
        </button>
      </div>
      <div className="task_table_container">
        {/* Mobile Card Layout */}
        <div className="mobile-task-list">
          {GetAllTaskStatus && GetAllTask?.data.length ? (
            GetAllTask?.data.map((task, index) => (
              <div key={index} className="task-card">
                <div className="task-card-header">
                  <h3 className="task-title">{task?.taskName}</h3>
                  <div className="action-container">
                    <button
                      className="action-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedData(task);
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>

                    {selectedData?._id === task?._id && (
                      <div className="action-dropdown">
                        <button
                          className="dropdown-item"
                          onClick={() => setOpenCard(true)}
                        >
                          ✓ Edit
                        </button>
                        <button
                          className="dropdown-item delete"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <p className="task-description">{task?.description}</p>
                <p className="task-date">{task?.dueDate}</p>
              </div>
            ))
          ) : (
            <p>No Task Found!</p>
          )}
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
            {!loading && GetAllTaskStatus && GetAllTask?.data.length ? (
              GetAllTask?.data.map((task, index) => (
                <tr key={index}>
                  <td className="task-number">
                    <div className="number-badge">{index + 1}</div>
                  </td>
                  <td className="task-date">
                    {format(new Date(task?.dueDate), "dd-MM-yyyy hh:mm a")}
                  </td>
                  <td className="task-name">{task?.taskName}</td>
                  <td className="task-description">{task?.description}</td>
                  <td className="task-action">
                    <div className="action-container">
                      <button
                        className="action-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedData(task);
                        }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {selectedData?._id === task?._id && (
                        <div className="action-dropdown">
                          <button
                            className="dropdown-item"
                            onClick={() => setOpenCard(true)}
                          >
                            ✓ Edit
                          </button>
                          <button
                            className="dropdown-item delete"
                            onClick={() => handleDelete(task._id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Task Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {openCard && (
        <AddTaskModal
          isOpen={openCard}
          onClose={() => {
            setOpenCard(false);
            setSelectedData(null);
          }}
          // onSave={handleSaveTask}
          editData={selectedData}
        />
      )}
    </div>
  );
};
export default Task;
