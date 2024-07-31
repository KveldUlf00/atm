import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Confirmations from "./Confirmations";
import Keyboard from "./Keyboard";
import Screen from "./Screen";

import { enableATMButtons } from "../state/permissions/permissionsSlice";
import availableStages from "../static/stages";
import { StagesNames, StageOption } from "../types/main";

function App() {
  const [stage, setStage] = useState<StagesNames>("start");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const atmButtonHandler = (panel: string, index: number) => {
    let dataIndex: number;

    if (panel === "left") {
      dataIndex = 2 * index;
    } else {
      dataIndex = 2 * index + 1;
    }
    console.log("clicked panel", panel);
    console.log("clicked index", index);
    console.log("availableStages", availableStages[stage]);
    console.log("i clicked", availableStages[stage][dataIndex]);

    const clickedElem = availableStages[stage][dataIndex] as StageOption;

    if (!("toStage" in clickedElem)) return;

    const chosenSubStage = clickedElem.toStage as StagesNames;

    if ("action" in clickedElem && clickedElem.action !== undefined) {
      const result = clickedElem.action!();

      if (result !== undefined) {
        setMessage(result);
      }

      setTimeout(() => {
        if (chosenSubStage !== null) {
          setStage(chosenSubStage);
        }
      }, 2000);
    } else if (chosenSubStage !== null) {
      setStage(chosenSubStage);
    }
  };

  useEffect(() => {
    console.log("enableATMButtons");
    dispatch(enableATMButtons());
  }, []);

  return (
    <div className="app">
      <div className="device">
        <Screen stage={stage} atmButtonHandler={atmButtonHandler} />
        <Confirmations message={message} />
        <Keyboard />
      </div>
    </div>
  );
}

export default App;
