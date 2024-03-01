import React from "react";
import Popup from "reactjs-popup";
import "./components.css";

const ResultsPopup = ({ open, setOpen, resultsData }) => {
  const closeModal = () => setOpen(false);
  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      <div className="modal">
        <a className="close" onClick={closeModal}>
          &times;
        </a>
        <h1 className="popup-header">Order Totals</h1>
        <div className="results">
          {Object.keys(resultsData).map((key) => (
            <div key={key} className="results-line">
              <p>{key}</p>
              <p>{resultsData[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default ResultsPopup;
