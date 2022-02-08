import React from "react";
import classnames from "tailwindcss-classnames";

const ImageWithHeader = ({ title, tileLetter, imageClassName, className }) => {
  return (
    <div className="column">
      <h1 className="text-white font-bold text-xl text-center">{title}</h1>
      <div className={classnames(imageClassName, className)}></div>
    </div>
  );
};

export default ImageWithHeader;
