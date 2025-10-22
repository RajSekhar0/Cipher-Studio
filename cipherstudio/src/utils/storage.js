import axios from "axios";

const API_BASE = "http://localhost:5000/api/projects"; // 👈 change to Render URL later after deployment

// Save project to backend
export async function saveProjectLocal(project) {
  try {
    const res = await axios.post(API_BASE, project);
    alert("✅ Project saved to MongoDB Atlas!");
    return res.data._id; // return the new project's ID
  } catch (err) {
    console.error("❌ Error saving project:", err);
    alert("❌ Could not save project. Check backend.");
  }
}

// Get all saved projects
export async function listLocalProjects() {
  try {
    const res = await axios.get(API_BASE + "/dummyUser");
    return res.data.map((p) => ({
      id: p._id,
      name: p.name,
      createdAt: p.createdAt,
    }));
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    return [];
  }
}

// Load one project by ID
export async function loadProjectLocal(id) {
  try {
    const res = await axios.get(API_BASE + "/view/" + id);
    return res.data;
  } catch (err) {
    console.error("❌ Error loading project:", err);
    return null;
  }
}

// Delete a project
export async function deleteProjectLocal(id) {
  try {
    await axios.delete(API_BASE + "/" + id);
    alert("🗑 Project deleted successfully!");
  } catch (err) {
    console.error("❌ Error deleting project:", err);
  }
}
