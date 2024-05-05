import React, { useEffect, useState } from "react";
import "./components.css";

const SubjectTypeSelector = ({ onSelectSubjectType, currentValue }) => {
  const [subjectClasses, setSubjectClasses] = useState("subject");

  const handleTypeChange = (e) => {
    const subjectValue = e.currentTarget.value;
    subjectValue === "Individual"
      ? setSubjectClasses("subject individual")
      : setSubjectClasses("subject");

    onSelectSubjectType(e.target.value);
  };

  useEffect(() => {
    if (currentValue === "Individual") setSubjectClasses("subject individual");
  }, [currentValue]);

  return (
    <div className="">
      <select
        className={subjectClasses}
        id="subjects"
        name="subjects"
        onChange={(e) => handleTypeChange(e)}
        defaultValue={currentValue}
      >
        <option className="subject-option" value="Team">
          Team
        </option>
        <option className="subject-option" value="Individual">
          Individual
        </option>
      </select>
    </div>
  );
};
export default SubjectTypeSelector;
