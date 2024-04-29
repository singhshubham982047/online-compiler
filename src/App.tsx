import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Compiler from "./pages/Compiler";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/compiler/:urlId" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
