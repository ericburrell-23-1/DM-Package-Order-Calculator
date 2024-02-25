import React, { useEffect } from "react";
import SubjectTypeSelector from "./SubjectTypeSelector";
import PackageSelector from "./PackageSelector";
import "./components.css";

const SubjectLine = ({ orderItem, onOrderChange }) => {
  const subjectType = orderItem.subjectType;

  const handleSubjectTypeSelect = (type) => {
    onOrderChange({ subjectType: type });
  };

  const handlePackageSelect = (pkg) => {
    onOrderChange({ package: pkg });
  };

  const handleSchoolQtyChange = (schoolQty) => {
    onOrderChange({ schoolQty });
  };

  const handleCoachQtyChange = (coachQty) => {
    onOrderChange({ coachQty });
  };

  useEffect(() => {
    console.log("OrderItem rendering:", orderItem);
  }, [orderItem]);

  return (
    <div className="flex-container subject-line">
      <SubjectTypeSelector
        onSelectSubjectType={handleSubjectTypeSelect}
        currentValue={subjectType}
      />
      {subjectType === "Individual" && (
        <PackageSelector
          onPackageSelect={handlePackageSelect}
          currentValue={orderItem.package}
        />
      )}
      {subjectType === "Team" && (
        <>
          <label htmlFor="schoolQty">School Quantity:</label>
          <input
            type="number"
            id="schoolQty"
            defaultValue={orderItem.schoolQty || 1}
            onChange={(e) => handleSchoolQtyChange(e.target.value)}
          />

          <label htmlFor="coachQty">Coach Quantity:</label>
          <input
            type="number"
            id="coachQty"
            defaultValue={orderItem.coachQty || 1}
            onChange={(e) => handleCoachQtyChange(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default SubjectLine;
