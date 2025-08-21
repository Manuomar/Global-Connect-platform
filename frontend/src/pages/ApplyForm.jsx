import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApplyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [form, setForm] = useState({
    Name: "",
    Mail: "",
    Contact: "",
    type: "",
    ResumeLink: "",
    Course: "",
    skills: "",
    Description: ""
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/jobs/${id}`);
        setJobTitle(res.data.title);
      } catch (err) {
        toast.error("Failed to load job details", {
          autoClose: 1000,
          closeButton: false
        });
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/apply", {
        ...form,
        jobId: id,
        jobTitle
      });

      toast.success("Application submitted successfully 🎉", {
        autoClose: 1500,
        closeButton: false
      });

      // Redirect after toast shows
      setTimeout(() => {
        navigate("/jobs");
      }, 1700);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        autoClose: 1000,
        closeButton: false
      });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <ToastContainer position="top-right" hideProgressBar />
      <h1 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["Name", "Mail", "Contact", "skills", "Course", "ResumeLink"].map((field) => (
          <input
            key={field}
            name={field}
            type="text"
            placeholder={field}
            className="border p-2 rounded w-full"
            value={form[field]}
            onChange={handleChange}
            required={field !== "Course"}
          />
        ))}

        <select
          name="type"
          className="border p-2 rounded w-full"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>

        <textarea
          name="Description"
          placeholder="Why should we hire you?"
          className="border p-2 rounded w-full"
          value={form.Description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded w-full">
          Apply Now
        </button>
      </form>
    </div>
  );
}
