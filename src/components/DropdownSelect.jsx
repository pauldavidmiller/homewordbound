import React from "react";
import { useCombobox } from "downshift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import classnames from "tailwindcss-classnames";
import List from "./List";

const DropdownSelect = ({ items, selectedItem, handleSelectedItemChange }) => {
  const itemToString = (item) => (item ? item : "");
  const [inputItems, setInputItems] = React.useState(items);
  const [autoFocus, setAutoFocus] = React.useState(true);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    setInputValue,
    getComboboxProps,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      const inputValueUpper = inputValue.toUpperCase();
      setInputItems(
        items.filter((item) => item.toUpperCase().includes(inputValueUpper))
      );
    },
    onSelectedItemChange: handleSelectedItemChange,
  });

  React.useEffect(() => {
    if (isOpen) {
      setInputValue("");
      setAutoFocus(true);
    }
  }, [isOpen, setInputValue]);

  return (
    <div className="search-select row">
      <div {...getComboboxProps()}>
        <button type="button" {...getToggleButtonProps()} className="row">
          <div className="w-5 h-5 ml-2 mt-2 float-left align-baseline">[i]</div>
          <div {...getLabelProps()} className="px-2 pt-0.5">
            {selectedItem}
          </div>
          <FontAwesomeIcon
            icon={faChevronDown}
            size="lg"
            className="text-gray-900 p-1 mt-1"
          />
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className={classnames(
          isOpen ? "border rounded-lg border-gray-700" : "",
          "search-dropdown-list"
        )}
      >
        {isOpen ? (
          <div className="sticky top-0 z-10 opacity-100 bg-green 300 py-2">
            <label className="px-2 text-center text-base">Search:</label>
            <input
              type="text"
              placeholder="Search"
              {...getInputProps()}
              autoFocus={autoFocus}
              className="sticky top-0 z-10 opacity-100 mx-2"
            />
            <button
              type="button"
              className="mr-4"
              tabIndex={-1}
              onClick={(e) => {
                setInputValue("");
              }}
            >
              <FontAwesomeIcon
                icon={faWindowClose}
                size="lg"
                className="text-gray-900"
              />
            </button>
          </div>
        ) : (
          <div {...getInputProps()}></div>
        )}
        <List
          items={inputItems}
          render={(virtualRow) => {
            return (
              <div
                className={classnames(
                  highlightedIndex === virtualRow.index ? "bg-blue-300" : "",
                  "search-dropdown-list-item"
                )}
                key={virtualRow.index}
                {...getItemProps({
                  item: virtualRow.item,
                  index: virtualRow.index,
                })}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="truncate px-2">
                  {inputItems[virtualRow.index]}
                </div>
              </div>
            );
          }}
          isOpen={isOpen}
        />
      </ul>
    </div>
  );
};

export default DropdownSelect;
