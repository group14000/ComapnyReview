import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const SeeReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getReviews");
        const reviewsData = await response.json();
        setReviews(reviewsData);
        console.log("Reviews data:", reviewsData); // Add this line for debugging
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReviews = reviews.filter((review) =>
    review.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <TextField
        label="Search Company"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={handleSearch}
        className="mb-4"
      />
      <ul className="space-y-4">
        {filteredReviews.map((review, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow-md">
            <p className="font-bold text-lg mb-2">
              Company Name: {review.companyName}
            </p>
            <p className="text-green-600 mb-2">Pros: {review.pros}</p>
            <p className="text-red-600 mb-2">Cons: {review.cons}</p>
            <p className="text-blue-600">Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeReviews;
