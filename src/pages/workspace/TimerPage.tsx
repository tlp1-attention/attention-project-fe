import { StartTimerButton } from "@features/timer/StartTimerButton";
import { StopTimerButton } from "@features/timer/StopTimerButton";
import { Timer } from "@features/timer/Timer";
import { TimerForm } from "@features/timer/TimerForm";
import "@pages/auth/Register.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function TimerPage() {
  const [params, setParams] = useSearchParams();
  const show = params.get("show");
  const [seconds] = useState(0);


  const showTimerForm = () =>
    setParams({ ...params, show: "open" });
  const hideTimerForm = () => setParams({
    ...params, show: "closed"
  });
  const stopTimer = () =>
    setParams({
      ...params,
      totalTime: "0"
    });

  return (
    <main className="color-brand">
      <div className="m-5 d-flex justify-content-center gap-3 align-items-center">
        <StartTimerButton onClick={showTimerForm} />
        <StopTimerButton onClick={stopTimer} disabled />
      </div>
      <article className="m-5 timer-container d-flex flex-wrap-reverse justify-content-center align-items-center align-content-center">
        <TimerForm show={show == "open"} close={hideTimerForm} />
        <Timer currentTime={seconds} title={"Tiempo libre"} strokeColor="green"/>
        <Timer currentTime={seconds} title={"Trabajo"} strokeColor="blue" />
      </article>
    </main>
  );
}
