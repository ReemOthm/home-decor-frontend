import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "@mui/material";

import router from "./routes";
import "./App.css"

function App() {

  return (
    <>  
      {/* <Container> */}
        <RouterProvider router={router} />
      {/* </Container> */}
      <ToastContainer />
    </>
  )
}

export default App
