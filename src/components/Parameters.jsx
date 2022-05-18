import { faHome, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardFlip from "./CardFlip";
import ParameterSelector from "./ParameterSelector";

const Parameters = ({
  focusPos,
  setAllFocus,
  letters,
  wordLengthFlipped,
  numTilesFlipped,
  revealedParametersFlipped,
}) => {
  return (
    <div
      className="parameters"
      onClick={(e) => {
        setAllFocus(focusPos);
      }}
    >
      <div className="row justify-center border-r-2 border-t-2 border-b-2 border-blue-400">
        <ParameterSelector title="Word Length">
          <CardFlip
            flipped={wordLengthFlipped}
            frontChildren={<div className="tile">ℓ</div>}
            backChildren={<div className="tile">{letters?.length}</div>}
          />
        </ParameterSelector>
        <ParameterSelector title="# Tiles Given">
          <CardFlip
            flipped={numTilesFlipped}
            frontChildren={<div className="tile">#</div>}
            backChildren={
              <div className="tile">
                {letters?.filter((letter) => letter !== null)?.length}
              </div>
            }
          />
        </ParameterSelector>
      </div>

      <FontAwesomeIcon
        icon={faLongArrowAltRight}
        size="3x"
        className="-pl-0.5 pr-2 self-center text-blue-400"
      />

      <div className="column justify-center whitespace-nowrap">
        <CardFlip
          flipped={revealedParametersFlipped}
          frontChildren={
            <FontAwesomeIcon icon={faHome} size="3x" className="text-white" />
          }
          backChildren={
            <div className="column justify-center gap-1">
              {letters
                ?.filter((letter) => letter !== null)
                ?.map((letter, index) => {
                  return (
                    <div className="row justify-center" key={index}>
                      <div className="tile border-2 border-red-500 cursor-default">
                        {letter?.toUpperCase()}
                      </div>
                      <div className="row text-center text-md pl-1.5 self-center tracking-tighter">
                        <span>in</span>
                        <span className="text-rose-500 font-bold pl-1">
                          Position
                        </span>
                        <span className="text-rose-500 font-bold pl-1">
                          {+letters?.indexOf(letter) + +1}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Parameters;
