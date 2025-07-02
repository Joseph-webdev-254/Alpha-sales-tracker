// components/SuccessCard.jsx
import "./SuccessCard.css"; // Adjust the path as necessary

const SuccessCard = ({ message, show }) => {
  return (
    <div className={`success-card ${show ? "show" : ""}`}>
      <div className="tick">✔</div>
      <p>{message || "Success!"}</p>
    </div>
  );
};

export default SuccessCard;
