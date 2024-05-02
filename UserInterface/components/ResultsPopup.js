import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./components.css";

const ResultsPopup = ({ open, setOpen, resultsData }) => {
  const [printMode, setPrintMode] = useState(false);
  const closeModal = () => setOpen(false);
  const handlePrint = () => {
    window.print();
    setPrintMode(false);
  };

  useEffect(() => {
    if (printMode) {
      handlePrint();
    }
  });

  const results = (
    <div className="modal" id="order-results">
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
      <button
        className="btn-print"
        type="button"
        onClick={() => setPrintMode(true)}
      >
        <span className="material-symbols-outlined">print</span>
      </button>
    </div>
  );

  if (printMode) {
    return <div className="print-out">{results}</div>;
  }

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
      {results}
    </Popup>
  );
};

export default ResultsPopup;
