import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Confirmations from "./Confirmations";
import Keyboard from "./Keyboard";
import Screen from "./Screen";
import { enableATMButtons } from "../state/permissions/permissionsSlice";

function App() {
  const dispatch = useDispatch();

  const atmButtonHandler = (panel: string, index: number) => {
    console.log("clicked panel", panel);
    console.log("clicked index", index);
  };

  useEffect(() => {
    console.log("enableATMButtons");
    dispatch(enableATMButtons());
  }, []);

  return (
    <div className="app">
      <div className="device">
        <Screen atmButtonHandler={atmButtonHandler} />
        <Confirmations />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
