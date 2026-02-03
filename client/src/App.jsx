import React from "react";
import "./App.css";
import Pages from "./pages/Pages.jsx";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
     <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
            />
    <Pages />
    </>
  );
}

export default App;
