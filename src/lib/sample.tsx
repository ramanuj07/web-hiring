const sampleCandidates = [
  {
    id: "candidate-1",
    jobId: "job-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    status: "applied",
    applicationDate: "2024-03-15",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5 years of full-stack development experience...",
    resumeUrl: "resume1.pdf",
  },
];
localStorage.setItem("candidates", JSON.stringify(sampleCandidates));
