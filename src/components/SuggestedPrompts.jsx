const SuggestedPrompts = ({ onSelect }) => {
  return (
    <div>
      <p onClick={() => onSelect("What are RESTful APIs")}>
        What are RESTful APIs
      </p>
    </div>
  );
};

export default SuggestedPrompts;
