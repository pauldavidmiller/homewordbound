import React from "react";
import classnames from "tailwindcss-classnames";

const ParameterSelector = ({ title, imageClassName, className, children }) => {
  return (
    <div className="column">
      <h1 className="text-white font-bold text-xl text-center">{title}</h1>
      <div className={classnames(imageClassName, className)}></div>
      {children}
    </div>
  );
};

export default ParameterSelector;
