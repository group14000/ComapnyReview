// SeeReviews.jsx
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const SeeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="max-w-lg mx-auto mt-8">
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
      />
      <ul>
        {filteredReviews.map((review, index) => (
          <li key={index}>
            <p>Company Name: {review.companyName}</p>
            <p>Pros: {review.pros}</p>
            <p>Cons: {review.cons}</p>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeReviews;
