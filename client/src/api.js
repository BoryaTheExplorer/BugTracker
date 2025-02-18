import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchBugs = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/bugs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching Bugs:", error);
        return [];
    }
}
export const createBug = async (bug) => {
    try {
        const response = await axios.post(`${API_URL}/api/bugs`, bug);
        return response.data;
    } catch (error) {
        console.error("Error creating bug:". error);
        return null;
    }
}

export const deleteBug = async (id) => {
    try {
        await axios.delete(`${API_URL}/api/bugs/${id}`);
        return id;
    } catch (error) {
        console.error("Error deleting bug:", error);
        return null;
    }
};

export const updateBug = async (id, bug) => {
    try {
        const response = await axios.put(`${API_URL}/api/bugs/${id}`, bug);
        return response.data;
    } catch (error) {
        console.error("Error updating bug:", error);
        return null;
    }
};