import { StrictMode } from "react";
import "./index.css";
import TestUrssaf from "./components/TestUrssaf";

function App() {
  return (
    <StrictMode>
      <div className=" flex flex-col gap-12 p-4 justify-center items-center w-full min-h-screen bg-linear-to-br from-indigo-600/20 to-white">
        <TestUrssaf />
      </div>
    </StrictMode>
  );
}

export default App;
