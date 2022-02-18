import React from "react";
import { useVirtual } from "react-virtual";

const List = ({ items, isOpen, render }) => {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: items.length,
    parentRef,
    estimateSize: React.useMemo((i) => items[i], [items]),
  });

  return (
    <div ref={parentRef} hidden={!isOpen} className="overflow-auto">
      <div
        style={{ height: `${rowVirtualizer.totalSize}px` }}
        className="relative"
      >
        {rowVirtualizer.virtualItems.map((virtualRow) => render(virtualRow))}
      </div>
    </div>
  );
};

export default List;
