import React from "react";
import Divider from "./Divider";
import Modal from "./Modal";

const Info = ({ infoOpen, setInfoOpen }) => {
  return (
    <Modal
      name="Info"
      modalOpen={infoOpen}
      setModalOpen={setInfoOpen}
      className="text-white"
    >
      <div className="column px-2">
        <h2 className="text-xl font-bold font-mono py-2">How to Play</h2>
        <text className="pb-2">
          Given criteria of a random word length and random letters in random
          positions - guess as many valid words that fit the given criteria.
        </text>
        <Divider />
        <text className="pb-2">
          Hit Enter on the keyboard or the button to the right of the input to
          check/enter the word.
        </text>
        <Divider />
        <text>
          The tile highlighted in{" "}
          <text className="text-green-500 font-bold">green</text> is where the
          cursor is currently pointed. The tiles highlighted in{" "}
          <text className="text-red-500 font-bold">red</text> are the parts of
          the word that are given by the random criteria.
        </text>
        <div className="info-demo" />
        <text>
          In this example, the starting cursor position is the first tile. The
          given tiles are two "T" tiles in the third and fifth positions. An
          example of a valid word is "POTATO".
        </text>
        <Divider />
        <text className="font-semibold underline underline-offset-1">
          Enjoy <text className="text-lg font-bold">Wordict</text>, there is a
          new game every day!
        </text>
      </div>
    </Modal>
  );
};

export default Info;
