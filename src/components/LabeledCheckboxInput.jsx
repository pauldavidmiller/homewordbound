import React from "react";
import { forwardRef } from "react";
import classnames from "tailwindcss-classnames";

const LabeledCheckboxInput = forwardRef(
  ({ name, defaultChecked, onChange, onClick, className, children }, ref) => (
    <div>
      <label className="row pt-1" htmlFor={name}>
        <div className="w-10 pr-2 align-middle select-none transition duration-200 ease-in">
          <label
            htmlFor={name}
            className="block h-6 rounded-full bg-gray-600 cursor-pointer"
          >
            <input
              type="checkbox"
              className="toggle-checkbox w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              name={name}
              id={name}
              ref={ref}
              defaultChecked={defaultChecked}
              onClick={onClick}
              onChange={onChange}
            />
          </label>
        </div>
        <span className={classnames(className, "pl-1 pt-0.5")}>{children}</span>
      </label>
    </div>
  )
);

export default LabeledCheckboxInput;
