import { useState } from "react";
import "../styles/RatingModal.css";

export default function RatingModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Rate this response</h3>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "active" : ""}
              onClick={() => setRating(star)}
            >
              ⭐
            </span>
          ))}
        </div>

        <textarea
          placeholder="Feedback (e.g. not a good experience)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() =>
              onSubmit({ rating, feedback })
            }
            disabled={rating === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
