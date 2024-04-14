import { useSocketContext } from "@features/real-time/context/useSocketContext";
import { StartTimerButton } from "@features/timer/StartTimerButton";
import { StopTimerButton } from "@features/timer/StopTimerButton";
import { Timer } from "@features/timer/Timer";
import { TimerForm } from "@features/timer/TimerForm";
import {
  DEFAULT_STATE,
  MODES,
  TIMER_ACTIONS,
  timerReducer
} from "@features/timer/reducer/timerReducer";
import "@pages/auth/Register.css";
import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

export function TimerPage() {
  const { socket } = useSocketContext()!;
  const [params, setParams] = useSearchParams();
  const [timerState, dispatch] = useReducer(timerReducer, DEFAULT_STATE);
  const show = params.get("show");

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerState.seconds == 0 && timerState.intervals.length !== 0) {
        if (timerState.mode == MODES.WORK) {
          socket?.emit("timer-work-done");
        } else if (timerState.mode == MODES.FREE) {
          socket?.emit("timer-free-done");
        }

        const audio = new Audio("assets/timer-done-sound.mp3");
        audio.play();

        dispatch({
          type: TIMER_ACTIONS.INTERVALS.NEXT
        });

      } else if (timerState.intervals.length !== 0) {
        dispatch({
          type: TIMER_ACTIONS.SECONDS.SET,
          payload: timerState.seconds - 1
        });
      }
    }, 1_000);

    return () => clearInterval(interval);
  }, [timerState.intervals.length, timerState.seconds, socket, timerState.mode]);

  const handleSubmit = (minutes: number) => {
    dispatch({
      type: TIMER_ACTIONS.TOTAL_MINUTES.SET,
      payload: +minutes
    });
  };


  const showTimerForm = () => setParams({ ...params, show: "open" });

  const hideTimerForm = () =>
    setParams({
      ...params,
      show: "closed"
    });

  const stopTimer = () => dispatch({
    type: TIMER_ACTIONS.INTERVALS.RESET,
  });

  return (
    <>
      <main className="color-brand">
        <div className="m-5 d-flex justify-content-center gap-3 align-items-center">
          <StartTimerButton onClick={showTimerForm} disabled={timerState.seconds != 0} />
          <StopTimerButton onClick={stopTimer} disabled={timerState.seconds == 0} />
        </div>
        <article className="m-5 timer-container d-flex flex-wrap-reverse justify-content-center align-items-center align-content-center">
          <TimerForm
            show={show == "open"}
            onSubmit={handleSubmit}
            close={hideTimerForm}
          />
          <Timer
            currentTime={timerState.mode == MODES.FREE ? timerState.seconds : 0}
            title={"Tiempo libre"}
            strokeColor="green"
            totalTime={timerState.freeTime * 60}
          />
          <Timer
            currentTime={timerState.mode == MODES.WORK ? timerState.seconds : 0}
            title={"Trabajo"}
            strokeColor="blue"
            totalTime={timerState.workTime * 60}
          />
        </article>
      </main>
    </>
  );
}
