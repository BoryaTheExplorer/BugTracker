import React, { useEffect, useState } from "react"
import BugList from "./components/BugList";
import BugForm from "./components/BugForm";
import BugDetails from "./components/BugDetails";
import { fetchBugs } from "./api"

import "./App.css";

function App() {
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  useEffect(() => {
    loadBugs();
  }, []);

  const loadBugs = async () => {
    const data = await fetchBugs();
    setBugs(data);
  };
  const handleSelectBug = (bug) => {
    setSelectedBug(bug);
  };
  const handleBugAdded = async () => {
    setShowForm(false);
    loadBugs();
  };

  const handleCreateBug = () =>{
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleBugUpdated =  (updatedBug) => {
    setBugs(bugs.map(bug => bug._id === updatedBug._id ? updatedBug : bug));
    setSelectedBug(updatedBug);
  };
  const handleBugDeleted = (deletedBugId) => {
    setBugs(bugs.filter(bug => bug._id !== deletedBugId));
    setSelectedBug(null);
  };

  const handleStatusFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };
  const handlePriorityFilterChange = (e) => {
    setFilterPriority(e.target.value);
  };

  const filteredBugs = bugs.filter((bug) => {
    if (filterStatus !== "All" && bug.status !== filterStatus) {
      return false;
    }
    if (filterPriority !== "All" && bug.priority !== filterPriority) {
      return false;
    }
    return true;
  });

  return (
    <div className="container">
      <div className="app-container">
        <div className="action-panel">
          <button className="create-button" onClick={handleCreateBug}>
            <strong>+</strong>
          </button>
          <select id="statusFilter"
                  value={filterStatus}
                  onChange={handleStatusFilterChange}
                  >
                    <option value="All">All</option>
                    <option value="Open">Open</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Resolved">Resolved</option>
          </select>
          <select id="priorityFilter"
                  value={filterPriority}
                  onChange={handlePriorityFilterChange}
                  >
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
          </select>

        </div>
        
        <div className="left-panel">
          <BugList bugs={filteredBugs} 
                    onSelectedBug={handleSelectBug}/>
        </div>

        <div className="right-panel">
          {selectedBug ? <BugDetails bug={selectedBug} onBugUpdated={handleBugUpdated} onBugDeleted={handleBugDeleted}/> : <p>Select a bug to view</p>}
        </div>

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <BugForm onClose={handleCloseForm} onBugAdded={handleBugAdded} />
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default App;
