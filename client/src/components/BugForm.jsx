import React, { useState } from "react";
import { createBug, fetchProjects, createProject } from "../api";
import "./BugForm.css";

function BugForm({ onClose, onBugAdded, projects }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState('Open');
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [projectId, setProjectId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newBug = await createBug({title, status, description, priority, projectId});

        if (newBug) {
            onBugAdded(newBug);
            setTitle("");
            setStatus('Open');
            setPriority("Medium");
            setDescription("");
            setProjectId('');
        }
    };

    return (
        <form className="bug-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text"
                   id="title"
                   placeholder="Enter bug Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   required 
            />
            <label htmlFor="projectId">Project:</label>
            <select id="projectId" 
                    value={projectId} 
                    onChange={(e) => setProjectId(e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>{project.name}</option>
                        ))}
                    </select>
            <div className="status-priority-row">
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select id="status"
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value='Open'>Open</option>
                        <option value="InProgress">In Progress</option>
                        <option value='Resolved'>Resolved</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>
            
            <label htmlFor="description">Description:</label>
            <textarea id="description"
                      placeholder="Enter bug Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required 
            />
            <button type="submit">Add Bug</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default BugForm;