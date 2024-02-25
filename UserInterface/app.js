import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import SubjectLine from "./components/SubjectLine";

function App() {
  const [orderItems, setOrderItems] = useState([
    { subjectType: "Team", package: null, schoolQty: "1", coachQty: "1" },
    { subjectType: "Individual", package: null, schoolQty: "1", coachQty: "1" },
  ]);

  const handleOrderItemChange = (updatedOrder, index) => {
    setOrderItems((prevOrderItems) => {
      const newOrderItems = prevOrderItems.map((item, i) => {
        if (i === index) {
          return { ...item, ...updatedOrder };
        }
        return item;
      });
      const lastItem = newOrderItems[newOrderItems.length - 1];
      if (
        lastItem.subjectType === "Team" ||
        (lastItem.subjectType === "Individual" &&
          (lastItem.package !== null || lastItem.package !== ""))
      ) {
        newOrderItems.push({
          subjectType: "Individual",
          package: null,
          schoolQty: "1",
          coachQty: "1",
        });
      }
      // CHECK FOR MULTIPLE EMPTY INDIVIDUAL PACKAGES
      const emptyIndividualIndex = newOrderItems.findIndex(
        (item) =>
          item.subjectType === "Individual" &&
          (item.package === null || item.package === "")
      );
      if (emptyIndividualIndex !== -1) {
        const remainingItems = newOrderItems.slice(emptyIndividualIndex + 1);
        for (const item of remainingItems) {
          if (
            item.subjectType === "Individual" &&
            (item.package === null || item.package === "")
          ) {
            const indexToRemove = newOrderItems.indexOf(item);
            newOrderItems.splice(indexToRemove, 1);
          }
        }
      }

      console.log("Order: ", orderItems);
      return newOrderItems;
    });
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
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
