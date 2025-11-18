import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({}); 
  const [coverLetterInputs, setCoverLetterInputs] = useState({});
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);

      if (user?.role === "Freelancer") {
        const resApps = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/freelancer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apps = await resApps.json();
        const appliedMap = {};
        apps.forEach(app => {
          appliedMap[app.job._id] = { coverLetter: app.coverLetter, status: app.status };
        });
        setAppliedJobs(appliedMap);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : job.category.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const handleApply = async (jobId) => {
    const coverLetter = coverLetterInputs[jobId];
    if (!coverLetter) return alert("Please write a cover letter!");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications/${jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ coverLetter }),
      });
      const data = await res.json();

      if (res.status === 403 || !res.ok) { alert(data.message || "Failed to apply"); return; }

      setAppliedJobs(prev => ({ ...prev, [jobId]: { coverLetter, status: "pending" } }));
      setCoverLetterInputs(prev => ({ ...prev, [jobId]: "" }));
      alert("Application submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleConnect = (job) => { navigate(`/freelancerChat/${job.createdBy._id}`); };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-orange-600">
        {selectedJob ? "Job Details" : "Available Jobs"}
      </h1>

      {selectedJob ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-600 mb-4">{selectedJob.title}</h2>
          <p className="text-gray-700 mb-4">{selectedJob.description}</p>
          <p className="text-gray-600 mb-2"><span className="font-medium">Budget:</span> ${selectedJob.budget}</p>
          <p className="text-gray-600 mb-2 capitalize"><span className="font-medium">Category:</span> {selectedJob.category}</p>
          <p className="text-gray-500 mb-4">Posted by: {selectedJob.createdBy?.name || "Unknown"}</p>
          <button
            onClick={() => setSelectedJob(null)}
            className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition"
          >
            Back
          </button>
        </div>
      ) : (
        <>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="all">All</option>
              <option value="design">Design</option>
              <option value="development">Development</option>
              <option value="writing">Writing</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

  
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.length > 0 ? filteredJobs.map(job => {
              const applied = appliedJobs[job._id];
              const inputValue = coverLetterInputs[job._id] || "";

              return (
                <div key={job._id} className="p-6 border rounded-2xl shadow-lg bg-white hover:shadow-xl transition transform hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-orange-600 mb-2">{job.title}</h3>
                  <p className="text-gray-700 mb-2 line-clamp-3">{job.description}</p>
                  <p className="text-sm text-gray-600 mb-1">Budget: ${job.budget}</p>
                  <p className="text-sm text-gray-600 capitalize mb-1">Category: {job.category}</p>
                  <p className="text-sm text-gray-500 mb-3">Posted by: {job.createdBy?.name || "Unknown"}</p>

                  
                  {applied ? (
                    <div className="text-center py-2 font-semibold rounded-full mb-2
                      capitalize
                      text-white
                      transition
                      bg-yellow-500
                      {applied.status === 'accepted' && 'bg-green-500'}
                      {applied.status === 'rejected' && 'bg-red-500'}
                    ">
                      {applied.status}
                    </div>
                  ) : (
                    user?.role === "Freelancer" && (
                      <input
                        type="text"
                        placeholder="Add your cover letter..."
                        value={inputValue}
                        onChange={e => setCoverLetterInputs(prev => ({ ...prev, [job._id]: e.target.value }))}
                        className="w-full border px-3 py-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    )
                  )}

                  <div className="flex gap-2">
                    {!applied && user?.id !== job.createdBy?._id.toString() && (
                      <button
                        onClick={() => handleApply(job._id)}
                        className="flex-1 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                      >
                        Apply
                      </button>
                    )}
                    <button
                      onClick={() => handleConnect(job)}
                      className="flex-1 bg-black text-white py-2 rounded-full hover:bg-gray-800 transition"
                    >
                      Connect / Chat
                    </button>
                  </div>
                </div>
              );
            }) : (
              <p className="text-center text-gray-500 col-span-full">No jobs available</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
