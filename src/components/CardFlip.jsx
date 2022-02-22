import React from "react";
import ReactCardFlip from "react-card-flip";
import CardFlipBack from "./CardFlipBack";
import CardFlipFront from "./CardFlipFront";

const CardFlip = ({ flipped, frontChildren, backChildren }) => {
  return (
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
      <CardFlipFront>{frontChildren}</CardFlipFront>
      <CardFlipBack>{backChildren}</CardFlipBack>
    </ReactCardFlip>
  );
};

export default CardFlip;
