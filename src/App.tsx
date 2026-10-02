import { createBrowserRouter } from "react-router";
import "./App.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Toolbar } from "./components/toolbar/Toolbar";
import { EditPage } from "./components/edit/EditPage";

export const router = createBrowserRouter([
  {
    index: true,
    element: (
      <>
        <Dashboard />
        <Toolbar />
      </>
    ),
  },
  {
    path: "edit/:designId",
    element: <EditPage />,
  },
]);
