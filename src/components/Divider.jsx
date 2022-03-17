import React from "react";
import classnames from "tailwindcss-classnames";

const Divider = ({ className }) => {
  return <div className={classnames("divider", className)} />;
};

export default Divider;
