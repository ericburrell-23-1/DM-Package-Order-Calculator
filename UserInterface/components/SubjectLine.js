import React, { useState, useEffect } from "react";
import SubjectTypeSelector from "./SubjectTypeSelector";
import PackageSelector from "./PackageSelector";
import "./components.css";

const SubjectLine = ({ orderItem, onOrderChange }) => {
  const subjectType = orderItem.subjectType;
  const [schoolQtyClasses, setSchoolQtyClasses] = useState("quantity-input");
  const [coachQtyClasses, setCoachQtyClasses] = useState("quantity-input");

  const handleSubjectTypeSelect = (type) => {
    onOrderChange({ subjectType: type });
  };

  const handlePackageSelect = (pkg) => {
    onOrderChange({ package: pkg });
  };

  const handleSchoolQtyChange = (schoolQty) => {
    onOrderChange({ schoolQty });
    schoolQty > 9
      ? setSchoolQtyClasses("quantity-input two-dig-qty")
      : setSchoolQtyClasses("quantity-input");
  };

  const handleCoachQtyChange = (coachQty) => {
    onOrderChange({ coachQty });
    coachQty > 9
      ? setCoachQtyClasses("quantity-input two-dig-qty")
      : setCoachQtyClasses("quantity-input");
  };

  useEffect(() => {
    if (orderItem.schoolQty > 9) {
      setSchoolQtyClasses("quantity-input two-dig-qty");
    }

    if (orderItem.coachQty > 9) {
      setCoachQtyClasses("quantity-input two-dig-qty");
    }
  }, []);

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
          <div className="quantity-input-wrapper">
            <label htmlFor="schoolQty">School Quantity:</label>
            <input
              className={schoolQtyClasses}
              type="number"
              id="schoolQty"
              defaultValue={orderItem.schoolQty || 1}
              onChange={(e) => handleSchoolQtyChange(e.target.value)}
            />
          </div>

          <div className="quantity-input-wrapper">
            <label htmlFor="coachQty">Coach Quantity:</label>
            <input
              className={coachQtyClasses}
              type="number"
              id="coachQty"
              defaultValue={orderItem.coachQty || 1}
              onChange={(e) => handleCoachQtyChange(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SubjectLine;
