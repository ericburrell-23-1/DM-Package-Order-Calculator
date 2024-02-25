import { apiEndpoint } from "./constants";

export const updateOrder = (updatedOrder, index, setOrderItems) => {
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

    console.log("Order: ", newOrderItems);
    return newOrderItems;
  });
};

const buildPackagesFrom = (orderItems) => {
  let packages = [];
  for (const item of orderItems) {
    if (item.subjectType === "Team") {
      packages.push("team", item.schoolQty, item.coachQty);
    }
    if (item.subjectType === "Individual" && item.package) {
      packages.push(item.package);
    }
  }
  console.log("Packages added to request body:", packages);
  return packages;
};

export const sendOrder = async (orderItems) => {
  const packages = buildPackagesFrom(orderItems);

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ packages }),
  });

  return await response.json();
};
