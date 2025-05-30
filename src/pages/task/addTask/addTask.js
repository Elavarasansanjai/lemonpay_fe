import React, { useState } from "react";
import { X } from "lucide-react";
import "./AddTaskModal.css";

const AddTaskModal = ({ isOpen, onClose, onSave, editData = null }) => {
  const [taskName, setTaskName] = useState(editData ? editData.task : "");
  const [description, setDescription] = useState(
    editData ? editData.description : ""
  );
  const [date, setDate] = useState(editData ? editData.date.split(" ")[0] : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() && description.trim() && date) {
      const taskData = {
        id: editData ? editData.id : Date.now(),
        task: taskName.trim(),
        description: description.trim(),
        date: `${date} 2:00 pm`,
      };
      onSave(taskData);
      handleClose();
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
              onChange={(e) => setDate(e.target.value)}
              className="form-input date-picker"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
