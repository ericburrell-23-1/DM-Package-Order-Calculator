import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import SubjectLine from "./components/SubjectLine";
import { updateOrder, sendOrder } from "./utility/functions";

function App() {
  const [orderItems, setOrderItems] = useState([
    { subjectType: "Team", package: null, schoolQty: "1", coachQty: "1" },
    { subjectType: "Individual", package: null, schoolQty: "1", coachQty: "1" },
  ]);

  const handleOrderItemChange = (updatedOrder, index) => {
    updateOrder(updatedOrder, index, setOrderItems);
  };

  const handleCalcualateOrder = async () => {
    const orderTotals = await sendOrder(orderItems);
    console.log(orderTotals);
  };

  return (
    <div>
      <h1>Ciotti Sports Order Counter</h1>
      <p>Enter packages &#40;separated by a space&#41; for each student:</p>
      {orderItems.map((item, index) => (
        <SubjectLine
          key={index}
          orderItem={item}
          onOrderChange={(o) => handleOrderItemChange(o, index)}
        />
      ))}
      <button onClick={handleCalcualateOrder}>Calculate Order</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
