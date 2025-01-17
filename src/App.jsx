import React from "react";
import Login from "./components/Login";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Notes from "./components/Notes";
import Register from "./components/Register";
import CreateNotes from "./components/CreateNotes";


const router = createBrowserRouter([
  {
    path : '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/notes',
    element: <Notes/>
  },
  {
    path: '/createnotes',
    element : <CreateNotes/>
  }

]);

const App = () => {
  return (
    // <div>
    //   <h1>Notes application</h1>
    //   <Routes>
    //     <Route path="/register" element={<Register/>} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/notes" element={<Notes />} />
    //   </Routes>
    // </div>
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;
