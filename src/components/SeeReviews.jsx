// Importing necessary React components and hooks
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

// Functional React component for displaying and searching reviews
const SeeReviews = () => {
  // State variables to manage search term and reviews data
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState([]);

  // useEffect hook to fetch reviews data when the component mounts
  useEffect(() => {
    // Async function to fetch reviews data from the server
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getReviews");
        const reviewsData = await response.json();

        // Setting the fetched reviews data in the state variable
        setReviews(reviewsData);

        // Logging the fetched reviews data for debugging
        console.log("Reviews data:", reviewsData);
      } catch (error) {
        // Handling errors during the fetch process
        console.error("Error fetching reviews:", error);
      }
    };

    // Invoking the fetchReviews function when the component mounts
    fetchReviews();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Event handler function to update the search term state
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtering reviews based on the search term
  const filteredReviews = reviews.filter((review) =>
    review.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // JSX structure for rendering the component
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-md">
      {/* Text field for entering the search term */}
      <TextField
        label="Search Company"
        variant="outlined"
        fullWidth
        margin="normal"
        InputProps={{
          // Adding search icon to the input field
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        // Handling changes in the search input
        onChange={handleSearch}
        className="mb-4"
      />
      {/* Rendering the list of filtered reviews */}
      <ul className="space-y-4">
        {filteredReviews.map((review, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow-md">
            {/* Displaying review details */}
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

// Exporting the component for use in other parts of the application
export default SeeReviews;
