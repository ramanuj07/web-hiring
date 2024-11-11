import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import Select from "./ui/select";

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

export const CandidateProfile: React.FC = () => {
  const { jobId, candidateId } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [status, setStatus] = useState<Candidate["status"]>("applied");

  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );
    const currentCandidate = storedCandidates.find(
      (c: Candidate) => c.id === candidateId && c.jobId === jobId
    );
    if (currentCandidate) {
      setCandidate(currentCandidate);
      setStatus(currentCandidate.status);
    }
  }, [candidateId, jobId]);

  const handleStatusUpdate = () => {
    if (!candidate) return;

    const storedCandidates = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );
    const updatedCandidates = storedCandidates.map((c: Candidate) =>
      c.id === candidateId ? { ...c, status } : c
    );

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    alert("Status updated successfully!");
  };

  if (!candidate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Button
          onClick={() => navigate(`/jobs/${jobId}/candidates`)}
          className="mb-4 bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          ← Back to Candidates
        </Button>
        <h2 className="text-2xl font-bold mb-2">Candidate Profile</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{candidate.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{candidate.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{candidate.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Application Date</p>
              <p className="font-medium">
                {new Date(candidate.applicationDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">
            Professional Information
          </h3>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-600 mb-2">Experience</p>
            <p className="whitespace-pre-wrap">{candidate.experience}</p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Application Status</h3>
          <div className="flex items-center gap-4">
            <Select
              value={status}
              onChange={(e) => setStatus(e as Candidate["status"])}
              options={[
                "applied",
                "screening",
                "interview",
                "offered",
                "rejected",
              ]}
              className="w-48"
            ></Select>
            <Button
              onClick={handleStatusUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Update Status
            </Button>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Resume</h3>
          <Button
            onClick={() => alert("Downloading resume: " + candidate.resumeUrl)}
            className="bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Download Resume
          </Button>
        </div>
      </div>
    </div>
  );
};
