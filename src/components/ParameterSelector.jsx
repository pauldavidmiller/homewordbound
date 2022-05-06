import React from "react";
import classnames from "tailwindcss-classnames";

const ParameterSelector = ({ title, imageClassName, className, children }) => {
  return (
    <div className="column px-1.5 py-0.5">
      <h1 className="text-white font-semibold text-sm text-center w-12">
        {title}
      </h1>
      {imageClassName && (
        <div className={classnames(imageClassName, className)}></div>
      )}
      <div className="justify-center">{children}</div>
    </div>
  );
};

export default ParameterSelector;
