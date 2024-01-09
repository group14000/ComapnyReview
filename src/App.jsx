import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FormInputData from "./components/FormInputData";
import CompanyReviewList from "./components/CompanyReviewList";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/add-review" />} />
            <Route path="/add-review" element={<FormInputData />} />
            <Route path="/see-review" element={<CompanyReviewList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
