import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Status() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/applications/client/me",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setApplications(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setLoading(false);
    }
  };

  const handleStatus = async (appId, status) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/applications/${appId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: data.status } : app
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading applications...</p>;

  if (applications.length === 0)
    return <p className="text-center mt-10 text-gray-500">No applications found.</p>;

  return (
    <div className="p-4 mt-25">
      <h2 className="text-2xl font-bold mb-6 text-center">Job Applications</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => {
          const isSelected = selectedApp === app._id;
          return (
            <div
              key={app._id}
              onClick={() =>
                setSelectedApp(app._id === selectedApp ? null : app._id)
              }
              className={`bg-white shadow-md rounded-lg p-4 flex flex-col justify-between
                transform transition-transform duration-200
                cursor-pointer
                ${
                  isSelected
                    ? "border-4 border-black scale-105 shadow-xl"
                    : "border border-transparent hover:scale-102 hover:shadow-lg"
                }`}
            >
              <div>
                <h3 className="text-lg font-semibold mb-1">{app.job.title}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Freelancer:</span> {app.freelancer.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> {app.freelancer.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Cover Letter:</span> {app.coverLetter}
                </p>
                <p
                  className={`font-medium mb-2 capitalize ${
                    app.status === "accepted"
                      ? "text-orange-600"
                      : app.status === "rejected"
                      ? "text-black"
                      : "text-yellow-600"
                  }`}
                >
                  Status: {app.status}
                </p>
              </div>
              {app.status === "pending" && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatus(app._id, "accepted");
                    }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatus(app._id, "rejected");
                    }}
                    className="flex-1 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
