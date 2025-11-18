import React, { useState, useEffect } from "react";

export default function PostJob() {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    category: "other",
  });
  const [search, setSearch] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const url = editingJob
        ? `http://localhost:5000/api/jobs/${editingJob._id}`
        : "http://localhost:5000/api/jobs";

      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setFormData({ title: "", description: "", budget: "", category: "other" });
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      budget: job.budget,
      category: job.category,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete job");
        return;
      }

      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-10 mt-15">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-orange-600">
        Jobs
      </h1>

    
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border px-3 py-2 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {/* Job Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 shadow-md rounded-lg mb-10 mt-2"
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          {editingJob ? "Update Job" : "Create Job"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="writing">Writing</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="w-full sm:w-auto bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
        >
          {editingJob ? "Update Job" : "Create Job"}
        </button>
      </form>

      {/* Job List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => {
          const isEditable = job.canEdit ?? true; // assuming `canEdit` property from backend
          return (
            <div
              key={job._id}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-orange-600">{job.title}</h3>
                <p className="text-gray-700">{job.description}</p>
                <p className="text-sm text-gray-500">Budget: ${job.budget}</p>
                <p className="text-sm text-gray-500 capitalize">Category: {job.category}</p>
                <p className="text-sm text-gray-400">
                  Created by: {job.createdBy?.name || "Unknown"}
                </p>
              </div>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => isEditable && handleEdit(job)}
                  className={`px-3 py-1 rounded text-white transition
                    ${isEditable ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed filter blur-sm"}`}
                  disabled={!isEditable}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
