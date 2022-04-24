import React from "react";
import Divider from "./Divider";
import Modal from "./Modal";

const Info = ({ infoOpen, setInfoOpen }) => {
  const emailTo = "pauldavidmiller98@gmail.com";
  const emailCC = "";
  const emailSub = "HomewordBound";
  const emailBody = "";

  return (
    <Modal
      name="Info"
      modalOpen={infoOpen}
      setModalOpen={setInfoOpen}
      className="text-white"
    >
      <div className="column px-2 text-sm">
        <h2 className="text-lg font-bold font-mono">How to Play</h2>
        <p>
          Given criteria of a random word length and random letters in random
          positions - guess as many valid words that fit the given criteria.
        </p>
        <Divider />
        <p>
          Hit Enter on the keyboard or the button to the right of the input to
          check/enter the word.
        </p>
        <Divider />
        <p className="">
          The tile highlighted in
          <span className="text-green-500 font-bold pl-1">green</span> is where
          the cursor is currently pointed. The tiles highlighted in
          <span className="text-red-500 font-bold pl-1">red</span> are the parts
          of the word that are given by the random criteria.
        </p>
        <div className="info-demo" />
        <p>
          In this example, the starting cursor position is the first tile. The
          given tiles are two "T" tiles in the third and fifth positions. An
          example of a valid word is "POTATO".
        </p>
        <Divider />
        <p className="font-semibold text-lg underline underline-offset-1 row">
          Enjoy the fun every day!
        </p>
        <p className="h-full text-semibold">
          To contact me with questions, comments, or concerns:
          <a
            href={
              "mailto:" +
              emailTo +
              "?cc=" +
              emailCC +
              "&subject=" +
              emailSub +
              "&body=" +
              emailBody
            }
            className="font-bold text-blue-500 underline px-2"
          >
            pauldavidmiller98@gmail.com
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default Info;
