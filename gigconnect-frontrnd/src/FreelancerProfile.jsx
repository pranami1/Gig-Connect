import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    location: "",
    hourlyRate: "",
    experience: "",
    portfolio: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const res = await fetch("http://localhost:5000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 404) {
          setProfile(null);
          setLoading(false);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setProfile(data);
        setFormData({
          bio: data.bio || "",
          skills: data.skills ? data.skills.join(", ") : "",
          location: data.location || "",
          hourlyRate: data.hourlyRate || "",
          experience: data.experience ? data.experience.join(", ") : "",
          portfolio: data.portfolio ? data.portfolio.join(", ") : "",
        });
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const res = await fetch("http://localhost:5000/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: formData.bio,
          skills: formData.skills.split(",").map((s) => s.trim()),
          location: formData.location,
          hourlyRate: formData.hourlyRate,
          experience: formData.experience
            ? formData.experience.split(",").map((s) => s.trim())
            : [],
          portfolio: formData.portfolio
            ? formData.portfolio.split(",").map((s) => s.trim())
            : [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save profile");

      setProfile(data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  const loggedInUser = profile?.user || {
    name: localStorage.getItem("loggedInUser") || "",
    email: localStorage.getItem("loggedInUserEmail") || "",
    role: localStorage.getItem("role") || "",
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10 lg:p-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Freelancer Profile
        </h2>

        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-orange-500 text-white text-2xl font-bold">
            {loggedInUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold">{loggedInUser.name}</h3>
            <p className="text-gray-600">{loggedInUser.email}</p>
            <p className="text-gray-500 text-sm capitalize">{loggedInUser.role}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* New Experience & Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience (comma separated)
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portfolio URLs (comma separated)
            </label>
            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
