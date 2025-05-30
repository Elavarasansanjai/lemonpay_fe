import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Context from "./context/context";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Task from "./pages/task/task";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/task", element: <Task /> },
]);

function App() {
  return (
    <>
      <Context>
        <RouterProvider router={router}></RouterProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                border: "2px solid #22c55e", // Tailwind green-500
              },
            },
            error: {
              style: {
                border: "2px solid #ef4444", // Tailwind red-500
              },
            },
          }}
        />
      </Context>
    </>
  );
}

export default App;
