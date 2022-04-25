import { useEffect, useState } from "react";
import { useRef } from "react";
import "./CodeInput.css";

interface ICodeInputProps {
  value: number[];
  onValueChange: (value: Array<number | null>) => void;
  error?: boolean;
  style?: any;
}

function CodeInput({ value, onValueChange, error, style }: ICodeInputProps) {
  const myRefs: any = useRef([]);
  const [values, setAllValues] = useState(value);
  const handleInputChange = (e: any, index: number) => {
    const inputValue = e.target.value;
    const isNumber = !isNaN(Number(inputValue));
    //Prevent user from entering non-numeric characters
    if (!isNumber) {
      e.target.value = "";
      return
    }
    if (inputValue.length > 0) {
      setAllValues(
        values.map((item: number, i: number) =>
          i === index ? parseInt(inputValue) : item
        )
      );
    }
    const nextRef = myRefs?.current[index + 1];
    if (inputValue.length > 0 && nextRef) {
      nextRef.focus();
    }
  };
  const onDelete = (index: number) => {
    const currentRef = myRefs.current[index];
    const currentValue = currentRef.value;
    const prevRef = myRefs.current[index - 1];
    
    setAllValues(
      values.map((item: any, i: number) =>
        i === index ? null : item
      )
    );
    if (currentValue.length === 0 && prevRef) {
      prevRef.focus();
    }
  };
  const isAllClear = value.every((item: number) => item === null);

  useEffect(() => {
    onValueChange(values);
  }, [values]);

  const setFocus = (id: number) => {
    const currentRef = myRefs.current[id];
    currentRef.focus();
  }

  if (value.length <= 0) return <></>;
  return (
    <div className="code-layout">
      {value.map((item, index: number) => {
        return (
          <input
            ref={(input) => (myRefs.current[index] = input)}
            key={index}
            className={"code-input"}
            style={error ? { border: "1px solid red", outline: 'none', ...style } : style}
            type={"tel"}

            onKeyDown={async (e) => {              
              if (e.keyCode === 8) {
                onDelete(index);
              }
              //Check if is the left arrow key.
              if (e.keyCode === 37) {
                const prevRef = myRefs.current[index - 1];
                const { selectionStart }: any = prevRef;
                if (prevRef) {
                  e.preventDefault()
                  prevRef.focus();
                  prevRef.setSelectionRange(selectionStart, 2);
                }
              }
              //Check if is the right arrow key
              if (e.keyCode === 39) {
                const nextRef = myRefs.current[index + 1];
                if (nextRef) {
                  nextRef.focus();
                }
              }

              //Check if the key is command + v (on mac)
              const isPasteOnMac = e.metaKey && e.keyCode === 86
              const isPasteOnWindows = e.ctrlKey && e.keyCode == 86
              if (isPasteOnMac || isPasteOnWindows) {
                e.preventDefault();
                const clipboardData = await navigator.clipboard.readText();
                const isCode = /^\d+$/.test(clipboardData) && clipboardData.length === value.length;
                const lastInput = value.length - 1
                if (isCode){
                  setAllValues(clipboardData.split('').map(Number));
                  setFocus(lastInput)
                }
              }
            }}
            onChange={(e) => handleInputChange(e, index)}
            value={!isAllClear ? item : undefined}
          />
        );
      })}
    </div>
  );
}

export default CodeInput;
