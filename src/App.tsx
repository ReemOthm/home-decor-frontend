import { RouterProvider } from "react-router-dom";

import "./App.css"
import router from "./routes";
import { Container } from "@mui/material";

function App() {

  return (
    <>  
      <Container>
        <RouterProvider router={router} />
      </Container>
    </>
  )
}

export default App
