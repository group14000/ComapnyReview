// ReviewForm.jsx
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

const ReviewForm = ({ onSubmit }) => {
  const [companyName, setCompanyName] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/saveReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyName, pros, cons, rating }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Review saved successfully");
        onSubmit({ companyName, pros, cons, rating });
        setCompanyName("");
        setPros("");
        setCons("");
        setRating(0);
      } else {
        console.error("Error saving review:", result.message);
      }
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8">
      <div className="mb-4">
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

export default ReviewForm;
