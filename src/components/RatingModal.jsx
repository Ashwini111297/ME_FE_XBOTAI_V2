import "../styles/RatingModal.css";

export default function RatingModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Rate this conversation</h3>
        <div className="stars">⭐⭐⭐⭐⭐</div>
        <textarea placeholder="Additional feedback (optional)" />
        <div className="actions">
          <button onClick={onClose}>Cancel</button>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}
