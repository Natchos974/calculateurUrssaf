import { StrictMode } from "react";
import "./index.css";
import TestUrssaf from "./components/TestUrssaf";

function App() {
  return (
    <StrictMode>
      <div className=" relative flex flex-col gap-12 p-4 justify-center items-center w-full min-h-screen bg-linear-to-br from-indigo-700/30 to-white">
        <TestUrssaf />
        <div class="absolute -z-10 inset-0 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-size-[10px_10px] md:bg-size-[50px_50px]" />
      </div>
    </StrictMode>
  );
}

export default App;
