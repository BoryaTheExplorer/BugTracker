require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
const projectSchema = new mongoose.Schema({
    name: String,
});
const Project = mongoose.model('Project', projectSchema);

app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    return projects;
});
app.post('/api/projects', async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
});
const bugSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: {type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium'},
    status: {type: String, enum: ['Open', 'InProgress', 'Resolved'], default: 'Open'},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Projects'},
    createdAt: {type: Date, default: Date.now}
});

const Bug = mongoose.model('Bug', bugSchema);

app.get('/api/bugs', async (req, res) => {
    const bugs = await Bug.find().populate('projectId');
    res.json(bugs);
});

app.post('/api/bugs', async (req, res) => {
    const newBug = new Bug(req.body);
    await newBug.save();
    res.json(newBug.populate('projectId'));
});

app.put('/api/bugs/:id', async (req, res) => {
    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('projectId');
    res.json(updatedBug);
});

app.delete('/api/bugs/:id', async (req, res) => {
    await Bug.findByIdAndDelete(req.params.id);
    res.json({message: 'Bug Deleted'});
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));