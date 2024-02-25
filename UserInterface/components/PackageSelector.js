import React from "react";
import "./components.css";

const PackageSelector = ({ onPackageSelect }) => {
  return (
    <div className="selector">
      <label htmlFor="package">Package:</label>
      <input
        name="package"
        id="package"
        list="packages"
        onChange={(e) => onPackageSelect(e.target.value)}
      />
      <datalist id="packages">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="G">G</option>
        <option value="H">H</option>
        <option value="I">I</option>
        <option value="J">J</option>
        <option value="K">K</option>
        <option value="L">L</option>
        <option value="M">M</option>
        <option value="N">N</option>
        <option value="O">O</option>
        <option value="P">P</option>
        <option value="Q">Q</option>
        <option value="R">R</option>
        <option value="S">S</option>
      </datalist>
    </div>
  );
};

export default PackageSelector;
