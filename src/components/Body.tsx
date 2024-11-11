import { RouterProvider, createBrowserRouter } from "react-router-dom";
import JobPostingsDashboard from "./Dashboard";
import { CandidatesList } from "./CandidatesList";
import { CandidateProfile } from "./CandidateProfile";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <JobPostingsDashboard />,
    },
    {
      path: "/jobs/:jobId/candidates",
      element: <CandidatesList />,
    },
    {
      path: "/jobs/:jobId/candidates/:candidateId",
      element: <CandidateProfile />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
