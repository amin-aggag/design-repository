import { Route, Routes } from "react-router";
import "./App.css";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Toolbar } from "./components/toolbar/Toolbar";
import { EditPage } from "./components/edit/EditPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={
          <>
            <Dashboard />
            <Toolbar/>
          </>
        } />
        <Route path="edit" element={
          <>
            <EditPage/>
          </>
        } />
      </Routes>
      
    </>
  );
}

export default App;
