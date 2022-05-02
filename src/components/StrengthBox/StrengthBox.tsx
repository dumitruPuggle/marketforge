import { LinearProgress, LinearProgressProps } from "@mui/material";
import { useEffect, useState } from "react";
import "./StrengthBox.css";

interface IStrengthBoxProps {
  password: string;
  firstName: string;
  lastName: string;
  className: string;
}

function StrengthBox({
  password,
  firstName,
  lastName,
  ...props
}: IStrengthBoxProps) {
  const [level, setLevel] = useState(0);
  const [color, setColor] = useState<LinearProgressProps["color"]>("primary");
  const [levelWord, setWord] = useState("");
  const [errors, setErrors] = useState({
    shouldNotIncludeNames: false,
    oneCapitalLetter: false,
    specialCharacter: false,
  });

  const specialCharacter = [
    "_",
    ".",
    "-",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "+",
    "=",
    "{",
    "}",
    "[",
    "]",
    ":",
    ";",
    '"',
    "'",
    "<",
    ">",
    ",",
    "?",
    "/",
    "|",
    "\\",
    "~",
    "`",
  ];
  const bannedWords = ["Dumitru", "Cucu"];
  useEffect(() => {
    if (password.length === 0) {
      setColor("warning");
      setWord("-");
      setLevel(0);
    }

    if (password.length > 0) {
      setColor("error");
      setWord("Weak 👎");
      setLevel(0);
    }

    if (password.length > 4) {
      setColor("error");
      setWord("Weak 👎");
      setLevel(10);
    }

    if (password.length > 5) {
      setColor("error");
      setWord("Weak 👎");
      setLevel(18);
    }

    if (password.length > 6) {
      setColor("error");
      setWord("Weak 👎");
      setLevel(24);
    }

    if (password.length > 7) {
      setColor("warning");
      setWord("Fair 👌");
      setLevel(30);
    }

    const oneCapitalLetter = password.match(/[A-Z]/g);
    const noBannedWords = bannedWords.every(
      (word: string) => !password.includes(word)
    );
    const containSpecialChar = specialCharacter.some((character: string) =>
      password.includes(character)
    );

    if (
      password.length > 8 &&
      containSpecialChar &&
      noBannedWords &&
      oneCapitalLetter
    ) {
      setColor("primary");
      setWord("👍");
      setLevel(50);
    }
  }, [password]);

  return (
    <div {...props} className={"strength-box " + props?.className}>
      <div className="strength-box-title-layout">
        <small className="strength-box-title">
          Security level: <strong>{levelWord}</strong>
        </small>
      </div>
      {levelWord !== "👍" && (
        <>
          <LinearProgress color={color} variant="determinate" value={level} />
          <div className="strength-box-layout">
            <small className="strength-box-text">
              Should not include names
            </small>
            <small className="strength-box-text">One capital letter</small>
            <small className="strength-box-text">Special character</small>
          </div>
        </>
      )}
    </div>
  );
}

export default StrengthBox;
