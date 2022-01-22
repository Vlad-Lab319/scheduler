import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // const transition = function(newMode, replace = false) {
  //   if (!replace) {

  //     setMode(newMode);
  //     // const newHistory = [...history];
  //     const newHistory = history;
  //     newHistory.push(newMode);
  //     setHistory(newHistory);
  //   } else {

  //   }

  // }

  // const back = function () {
  //   const newHistory = history;
  //   newHistory.pop();
  //   setHistory(newHistory);
  //   setMode(history[history.length - 1]);
  // }

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => [...prev]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length !== 0) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };
  


  return {
    mode,
    transition,
    back,
    history
  };
}