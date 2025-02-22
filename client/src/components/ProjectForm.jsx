import React, {useState} from "react";
import { createProject } from "../api";

const ProjectForm = ({ onClose, onProjectAdded }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProject = await createProject({ name });

        if (newProject) {
            setName('');
            onProjectAdded();
            onClose();
        } else {
            console.error("Shit is not bussing");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="project-form">
            <label htmlFor="name">Project Name:</label>
            <input type="text"
                   id="name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   required 
            />
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    );
};

export default ProjectForm;