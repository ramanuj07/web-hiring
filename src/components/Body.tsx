import { RouterProvider, createBrowserRouter } from "react-router-dom";
import JobPostingsDashboard from "./Dashboard";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <JobPostingsDashboard />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
