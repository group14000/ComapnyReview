import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReviewForm from "./components/ReviewForm";
import SeeReviews from "./components/SeeReviews";

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
            <Route path="/add-review" element={<ReviewForm />} />
            <Route path="/see-review" element={<SeeReviews />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
