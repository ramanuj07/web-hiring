import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  status: "applied" | "screening" | "interview" | "offered" | "rejected";
  applicationDate: string;
  skills: string[];
  experience: string;
  resumeUrl: string;
}

export const CandidatesList: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const jobPostings = JSON.parse(localStorage.getItem("jobPostings") || "[]");
    const currentJob = jobPostings.find((job: any) => job.id === jobId);
    setJob(currentJob);

    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );
    const jobCandidates = storedCandidates.filter(
      (candidate: Candidate) => candidate.jobId === jobId
    );
    setCandidates(jobCandidates);
  }, [jobId]);

  const handleViewProfile = (candidateId: string) => {
    navigate(`/jobs/${jobId}/candidates/${candidateId}`);
  };

  const handleDownloadResume = (resumeUrl: string) => {
    alert("Downloading resume: " + resumeUrl);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{job?.title} - Candidates</h2>
        <p className="text-gray-600">Total Candidates: {candidates.length}</p>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border text-left">Name</th>
            <th className="p-2 border text-left">Status</th>
            <th className="p-2 border text-left">Application Date</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-100">
              <td className="p-2 border">{candidate.name}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    candidate.status === "applied"
                      ? "bg-blue-100 text-blue-800"
                      : candidate.status === "screening"
                      ? "bg-yellow-100 text-yellow-800"
                      : candidate.status === "interview"
                      ? "bg-purple-100 text-purple-800"
                      : candidate.status === "offered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {candidate.status.charAt(0).toUpperCase() +
                    candidate.status.slice(1)}
                </span>
              </td>
              <td className="p-2 border">
                {new Date(candidate.applicationDate).toLocaleDateString()}
              </td>
              <td className="p-2 border text-center">
                <Button
                  onClick={() => handleViewProfile(candidate.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 mr-2 rounded"
                >
                  View Profile
                </Button>
                <Button
                  onClick={() => handleDownloadResume(candidate.resumeUrl)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
                >
                  Download Resume
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
