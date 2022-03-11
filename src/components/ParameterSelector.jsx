import React from "react";
import classnames from "tailwindcss-classnames";

const ParameterSelector = ({ title, imageClassName, className, children }) => {
  return (
    <div className="column p-3">
      <h1 className="text-white font-bold text-xl text-center pb-1">{title}</h1>
      {imageClassName && (
        <div className={classnames(imageClassName, className)}></div>
      )}
      <div className="justify-center">{children}</div>
    </div>
  );
};

export default ParameterSelector;
