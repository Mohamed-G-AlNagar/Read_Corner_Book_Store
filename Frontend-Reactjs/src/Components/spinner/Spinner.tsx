export default function Spinner() {
  return (
    <div className="overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3">
      <div className="spinner-container">
        <div className="spinner-border text-primary fs-5 z-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}