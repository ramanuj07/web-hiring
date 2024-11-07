import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

interface JobPosting {
  id: string;
  title: string;
  description: string;
  applicants: number;
}

const JobPostingsDashboard: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newJobPosting, setNewJobPosting] = useState<Partial<JobPosting>>({
    title: "",
    description: "",
    applicants: 0,
  });

  useEffect(() => {
    const storedJobPostings = localStorage.getItem("jobPostings");
    if (storedJobPostings) {
      setJobPostings(JSON.parse(storedJobPostings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobPostings", JSON.stringify(jobPostings));
  }, [jobPostings]);

  const handleAddJobPosting = () => {
    setShowModal(true);
  };

  const handleSaveJobPosting = () => {
    if (newJobPosting.title && newJobPosting.description) {
      const newPosting: JobPosting = {
        id: `job-${jobPostings.length + 1}`,
        title: newJobPosting.title,
        description: newJobPosting.description,
        applicants: newJobPosting.applicants || 0,
      };
      setJobPostings([...jobPostings, newPosting]);
      setNewJobPosting({
        title: "",
        description: "",
        applicants: 0,
      });
      setShowModal(false);
    }
  };

  const handleEditJobPosting = (jobPosting: JobPosting) => {
    setNewJobPosting(jobPosting);
    setShowModal(true);
  };

  const handleDeleteJobPosting = (jobPosting: JobPosting) => {
    setJobPostings(jobPostings.filter((p) => p.id !== jobPosting.id));
  };

  const handleInputChange = (
    field: "title" | "description" | "applicants",
    value: string | number
  ) => {
    setNewJobPosting((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Job Postings</h2>
        <Button
          onClick={handleAddJobPosting}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Job Posting
        </Button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border text-left">Title</th>
            <th className="p-2 border text-left">Description</th>
            <th className="p-2 border text-center">Applicants</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobPostings.map((jobPosting) => (
            <tr key={jobPosting.id} className="hover:bg-gray-100">
              <td className="p-2 border">{jobPosting.title}</td>
              <td className="p-2 border">{jobPosting.description}</td>
              <td className="p-2 border text-center">
                {jobPosting.applicants}
              </td>
              <td className="p-2 border text-center">
                <Button
                  onClick={() => handleEditJobPosting(jobPosting)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteJobPosting(jobPosting)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-medium mb-4">
              {newJobPosting.id ? "Edit Job Posting" : "Add New Job Posting"}
            </h3>
            <div className="mb-4">
              <label htmlFor="title" className="block font-medium mb-2">
                Title
              </label>
              <Input
                id="title"
                type="text"
                value={newJobPosting.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <Textarea
                id="description"
                value={newJobPosting.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="applicants" className="block font-medium mb-2">
                Applicants
              </label>
              <Input
                id="applicants"
                type="number"
                value={newJobPosting.applicants || 0}
                onChange={(e) =>
                  handleInputChange("applicants", Number(e.target.value))
                }
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleSaveJobPosting}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostingsDashboard;
