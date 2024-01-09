import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const CompanyReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getReviews");
        const data = await response.json();
        console.log("Fetched data:", data); // Add this line for debugging
        if (data.success) {
          setReviews(data.data);
        } else {
          console.error("Error fetching reviews:", data.message);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once on mount

  const handleFormSubmit = (reviewData) => {
    // Add the submitted review to the list
    setReviews([...reviews, reviewData]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReviews = reviews.filter((review) =>
    review.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <TextField
        label="Search Company"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-500" />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
        className="mb-4"
      />
      <ul className="list-none p-0">
        {filteredReviews.map((review, index) => (
          <li key={index} className="mb-6 border-b border-gray-200 pb-4">
            <p className="text-xl font-semibold mb-2">
              Company Name: {review.companyName}
            </p>
            <p className="text-gray-700 mb-2">Pros: {review.pros}</p>
            <p className="text-gray-700 mb-2">Cons: {review.cons}</p>
            <p className="text-gray-700">Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyReviewList;
