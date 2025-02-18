import React, { useEffect, useState } from "react";
import { updateBug, deleteBug } from "../api";

import "./BugDetails.css"

const BugDetails = ({ bug, onBugUpdated, onBugDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBug, setEditedBug] = useState({...bug});

    useEffect(() => {
        setEditedBug({...bug});
        if (isEditing) {
            setIsEditing(false);
        }
    }, [bug]);

    const handleEditChange = (e) => {
        setEditedBug({ ...editedBug, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const updated = await updateBug(editedBug._id, editedBug);
        if (updated) {
            onBugUpdated(updated);
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Confirm Deletion")) {
            const deleted = await deleteBug(bug._id);
            if (deleted) {
                onBugDeleted(bug._id);
            } else {
                console.error("Failed bug removal");
            }
        }
    };

    return (
        <div className="bug-info">
            {isEditing ? (
                <form className="bug-form" onSubmit={handleEditSubmit}>
                    <input type="text"
                           name="title"
                           value={editedBug.title}
                           onChange={handleEditChange}
                           required
                    />
                    <select name="status"
                            value={editedBug.status}
                            onChange={handleEditChange}>
                        <option value="Open">Open</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                    <select name="prioroty" 
                            value={editedBug.priority}
                            onChange={handleEditChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <textarea name="description"
                              value={editedBug.description}
                              onChange={handleEditChange}
                              required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <div className="title-container">
                        <h2 className="title">{bug.title}</h2>
                    </div>
                    <p><strong>Status:</strong> {bug.status}</p>
                    <p><strong>Priority:</strong> {bug.priority}</p>
                    <label htmlFor="description"><strong>Description</strong></label>
                    <p id="description" className="description">{bug.description}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default BugDetails;