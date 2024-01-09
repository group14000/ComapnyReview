// Importing necessary React components and hooks
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

// Functional React component for rendering a review form
const FormInputData = ({ onSubmit }) => {
  // State variables to manage form input values
  const [companyName, setCompanyName] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [rating, setRating] = useState(0);

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to save the review to the server
      const response = await fetch("http://localhost:3001/api/saveReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, pros, cons, rating }),
      });

      // Parsing the response from the server
      const result = await response.json();

      // Checking if the review was saved successfully
      if (result.success) {
        console.log("Review saved successfully");

        // Callback to parent component to handle the submitted review
        onSubmit({ companyName, pros, cons, rating });

        // Clearing the form input values
        setCompanyName("");
        setPros("");
        setCons("");
        setRating(0);
      } else {
        // Logging an error message if the review couldn't be saved
        console.error("Error saving review:", result.message);
      }
    } catch (error) {
      // Logging an error message if there's an issue with the request
      console.error("Error saving review:", error);
    }
  };

  // JSX structure for rendering the review form
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
        {/* Text field for entering the company name */}
        <TextField
          label="Company Name"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Text field for entering the pros of the review */}
        <TextField
          label="Pros"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={pros}
          onChange={(e) => setPros(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Text field for entering the cons of the review */}
        <TextField
          label="Cons"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={cons}
          onChange={(e) => setCons(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {/* Rating input field */}
        <label className="block mb-2 text-gray-700">Rating:</label>
        <Rating
          name="rating"
          size="large"
          value={rating}
          precision={1}
          onChange={(e, value) => setRating(value)}
          icon={<span style={{ fontSize: 30 }}>★</span>}
        />
      </div>
      <div>
        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

// Exporting the component for use in other parts of the application
export default FormInputData;
