import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Confirmations from "./Confirmations";
import Keyboard from "./Keyboard";
import Screen from "./Screen";

import {
  enableATMButtons,
  windowIsLoading,
  windowIsLoaded,
} from "../state/permissions/permissionsSlice";
import availableStages from "../static/stages";
import { StagesNames, StageOption } from "../types/main";
// import { RootState } from "../state/store";

function App() {
  const [stage, setStage] = useState<StagesNames>("start");
  const [message, setMessage] = useState("");

  // const canUseKeyboard = useSelector(
  //   (state: RootState) => state.permissions.canUseKeyboard
  // );

  const dispatch = useDispatch();

  const stageHandler = (stage: StageOption) => {
    if (!("toStage" in stage)) return;

    const chosenSubStage = stage.toStage as StagesNames;

    dispatch(windowIsLoading());

    if ("emptyAction" in stage && stage.emptyAction !== undefined) {
      stage.emptyAction!();
    }

    if ("action" in stage && stage.action !== undefined) {
      setTimeout(() => {
        if (chosenSubStage !== null) {
          setStage(chosenSubStage);
          dispatch(windowIsLoaded());

          const result = stage.action!();

          if (result !== undefined) {
            setMessage(result);
          }
        }
      }, 2000);
    } else if (chosenSubStage !== null) {
      setStage(chosenSubStage);
      dispatch(windowIsLoaded());
    }
  };

  const atmButtonHandler = (panel: string, index: number) => {
    let dataIndex: number;

    if (panel === "left") {
      dataIndex = 2 * index;
    } else {
      dataIndex = 2 * index + 1;
    }

    const clickedElem = availableStages[stage][dataIndex] as StageOption;

    stageHandler(clickedElem);
  };

  useEffect(() => {
    const waitAndSetMessage = async () => {
      console.log("loading");
      dispatch(windowIsLoading());
      const min = 1000;
      const max = 2500;
      await new Promise((resolve) =>
        setTimeout(resolve, min + Math.random() * (max - min))
      );
      dispatch(windowIsLoaded());
      console.log("its loaded");
    };

    if (stage === "start") waitAndSetMessage();
  }, [stage]);

  useEffect(() => {
    dispatch(enableATMButtons());
  }, [dispatch]);

  return (
    <div className="app">
      <div className="device">
        <Screen stage={stage} atmButtonHandler={atmButtonHandler} />
        <Confirmations message={message} setMessage={setMessage} />
        <Keyboard setStage={setStage} />
      </div>
    </div>
  );
}

export default App;
