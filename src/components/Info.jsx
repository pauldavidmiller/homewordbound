import React from "react";
import Divider from "./Divider";
import Modal from "./Modal";

const Info = ({ infoOpen, setInfoOpen }) => {
  const emailTo = "pauldavidmiller98@gmail.com";
  const emailCC = "";
  const emailSub = "Wordict";
  const emailBody = "";

  return (
    <Modal
      name="Info"
      modalOpen={infoOpen}
      setModalOpen={setInfoOpen}
      className="text-white"
    >
      <div className="column px-2">
        <h2 className="text-xl font-bold font-mono py-2">How to Play</h2>
        <div className="pb-2">
          Given criteria of a random word length and random letters in random
          positions - guess as many valid words that fit the given criteria.
        </div>
        <Divider />
        <div className="pb-2">
          Hit Enter on the keyboard or the button to the right of the input to
          check/enter the word.
        </div>
        <Divider />
        <div className="wrap">
          The tile highlighted in
          <div className="text-green-500 font-bold px-1">green</div> is where
          the cursor is currently pointed. The tiles highlighted in{" "}
          <div className="text-red-500 font-bold px-1">red</div> are the parts
          of the word that are given by the random criteria.
        </div>
        <div className="info-demo" />
        <div>
          In this example, the starting cursor position is the first tile. The
          given tiles are two "T" tiles in the third and fifth positions. An
          example of a valid word is "POTATO".
        </div>
        <Divider />
        <div className="font-semibold text-lg underline underline-offset-1 row">
          Enjoy the fun every day!
        </div>
        <div className="h-full text-lg- text-semibold mt-8">
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
        </div>
      </div>
    </Modal>
  );
};

export default Info;
