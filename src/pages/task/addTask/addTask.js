import React, { useContext, useState } from "react";
import { X } from "lucide-react";
import "./AddTaskModal.css";
import { AppContext } from "../../../context/context";
import { apiList } from "../../../context/apiList";
import { action } from "../../../context/action";

const AddTaskModal = ({ isOpen, onClose, onSave, editData }) => {
  console.log(editData, "--------------jhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  const { apiPOSTMethod, apiGETMethod } = useContext(AppContext);
  const [taskName, setTaskName] = useState(editData ? editData?.taskName : "");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [date, setDate] = useState(
    editData?.dueDate
      ? new Date(editData?.dueDate).toISOString().split("T")[0]
      : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!editData) {
      if (taskName.trim() && description.trim() && date) {
        apiPOSTMethod(apiList.AddTask, {
          taskName: taskName,
          description: description,
          dueDate: date,
        }).then((res) => {
          setLoading(false);
          if (res.code === 200) {
            apiPOSTMethod(apiList.GetAllTask, {}, action.GetAllTask).then(
              (res) => {
                handleClose();
              }
            );
          }
        });
      } else {
        setLoading(false);
        alert("Please Fill All Fealds!");
      }
    } else {
      if (taskName.trim() && description.trim() && date) {
        console.log(editData?._id, "========taskkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        apiPOSTMethod(apiList.editeTask, {
          taskName: taskName,
          description: description,
          dueDate: date,
          taskId: editData?._id,
        }).then((res) => {
          setLoading(false);
          if (res.code === 200) {
            apiPOSTMethod(apiList.GetAllTask, {}, action.GetAllTask).then(
              (res) => {
                handleClose();
              }
            );
          }
        });
      } else {
        setLoading(false);
        alert("Please Fill All Fealds!");
      }
    }
  };

  const handleClose = () => {
    setTaskName("");
    setDescription("");
    setDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editData ? "Edit Task" : "Add Task"}</h2>
          <button className="close-button" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className="form-input date-picker"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            {/* <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
            >
              Cancel
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
