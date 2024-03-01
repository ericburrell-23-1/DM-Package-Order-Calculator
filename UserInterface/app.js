import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { updateOrder, sendOrder } from "./utility/functions";
import SubjectLine from "./components/SubjectLine";
import ResultsPopup from "./components/ResultsPopup";
import "./components/components.css";

function App() {
  const [orderItems, setOrderItems] = useState([
    { subjectType: "Team", package: null, schoolQty: "1", coachQty: "1" },
    { subjectType: "Individual", package: null, schoolQty: "1", coachQty: "1" },
  ]);
  const [results, setResults] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleOrderItemChange = (updatedOrder, index) => {
    updateOrder(updatedOrder, index, setOrderItems);
  };

  const handleCalcualateOrder = async () => {
    const orderTotals = await sendOrder(orderItems);
    setResults(orderTotals.output);
    console.log(orderTotals);
    setShowPopup(true);
  };

  return (
    <div>
      <div className="headline">
        <h1>Ciotti Sports Order Counter</h1>
        <p>Enter packages &#40;separated by a space&#41; for each student:</p>
      </div>
      {orderItems.map((item, index) => (
        <SubjectLine
          key={index}
          orderItem={item}
          onOrderChange={(o) => handleOrderItemChange(o, index)}
        />
      ))}
      <button className="calculate-button" onClick={handleCalcualateOrder}>
        Calculate Order
      </button>
      <ResultsPopup
        open={showPopup}
        setOpen={setShowPopup}
        resultsData={results}
      />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
