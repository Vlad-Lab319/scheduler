// Hook for appointment modes transitions and record of their history.

import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

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
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory([ ...newHistory ]);
    }
  };
  
  return {
    mode,
    transition,
    back,
    history
  };
}