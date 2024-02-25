import React from "react";
import "./components.css";

const SubjectTypeSelector = ({ onSelectSubjectType, currentValue }) => {
  return (
    <div className="selector">
      <select
        id="subjects"
        name="subjects"
        onChange={(e) => onSelectSubjectType(e.target.value)}
        defaultValue={currentValue}
      >
        <option value="Team">Team</option>
        <option value="Individual">Individual</option>
      </select>
    </div>
  );
};
export default SubjectTypeSelector;
