import { StartTimerButton } from "@features/timer/StartTimerButton";
import { StopTimerButton } from "@features/timer/StopTimerButton";
import { Timer } from "@features/timer/Timer";
import { TimerForm } from "@features/timer/TimerForm";
import { useTimer } from "@features/timer/hooks/useTimer";
import "@pages/auth/Register.css";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function TimerPage() {
  const [params, setParams] = useSearchParams();
  /** The index of time interval currently running */
  const [intervalIndex, setIntervalIndex] = useState(0);
  const show = params.get("show");
  /** The time to divide between the two clocks */
  const [totalTimeMin, setTotalTimeMin] = useState(0);

  const [seconds, { setSeconds }] = useTimer(totalTimeMin, () => {
    if (intervalIndex > intervals.length - 1) {
      return;
    }
    setIntervalIndex(idx => idx + 1);
  });

  const intervals = useMemo(() => divideTime(totalTimeMin), [totalTimeMin]);

  const mode = useMemo(() => {
    const currentInterval = intervals[intervalIndex];
    return currentInterval?.mode;
  }, [intervalIndex, intervals]);

  const freeTime = useMemo(() => {
    const currentInterval = intervals[intervalIndex];
    if (!currentInterval || currentInterval.mode != MODES.FREE) return 0;
    return currentInterval.time;
  }, [intervals, intervalIndex]);

  const workTime = useMemo(() => {
    const currentInterval = intervals[intervalIndex];
    if (!currentInterval || currentInterval.mode != MODES.WORK) return 0;
    return currentInterval.time;
  }, [intervals, intervalIndex]);

  useEffect(() => {
    const time = mode == MODES.WORK ? workTime : freeTime;
    setSeconds(time * 60);
  }, [mode, workTime, freeTime, setSeconds]);

  const handleSubmit = (minutes: number) => {
    setTotalTimeMin(minutes);
  };

  const showTimerForm = () => setParams({ ...params, show: "open" });

  const hideTimerForm = () =>
    setParams({
      ...params,
      show: "closed"
    });

  const stopTimer = () => setTotalTimeMin(0);

  return (
    <>
      <main className="color-brand">
        <div className="m-5 d-flex justify-content-center gap-3 align-items-center">
          <StartTimerButton onClick={showTimerForm} disabled={seconds != 0} />
          <StopTimerButton onClick={stopTimer} disabled={seconds == 0} />
        </div>
        <article className="m-5 timer-container d-flex flex-wrap-reverse justify-content-center align-items-center align-content-center">
          <TimerForm
            show={show == "open"}
            onSubmit={handleSubmit}
            close={hideTimerForm}
          />
          <Timer
            currentTime={mode == MODES.FREE ? seconds : 0}
            title={"Tiempo libre"}
            strokeColor="green"
            totalTime={+freeTime * 60}
          />
          <Timer
            currentTime={mode == MODES.WORK ? seconds : 0}
            title={"Trabajo"}
            strokeColor="blue"
            totalTime={+workTime * 60}
          />
        </article>
      </main>
    </>
  );
}

/**
 * Available modes for a Timer: 'Free' and 'Work'
 */
const MODES = {
  WORK: "Work",
  FREE: "Free"
};

/**
 * Takes a total time in minutes and automatically divides them in
 * a bunch of intervals of work time and free time
 */
function divideTime(minutes: number) {
  const intervals = [];

  const { timeOfWork, timeFree } = getTimerConfig(minutes);
  let timeTaken = 0;
  let i = 0;

  while (timeTaken < minutes) {
    if (i % 2 == 0) {
      intervals.push({
        time: timeOfWork,
        mode: MODES.WORK
      });
      timeTaken += timeOfWork;
    } else {
      intervals.push({
        time: timeFree,
        mode: MODES.FREE
      });
      timeTaken += timeFree;
    }
    i++;
  }
  console.log(intervals);
  return intervals;
}

/**
 * Gets the configuration of free and work time
 * using the minutes it receives
 */
function getTimerConfig(minutes: number) {
  console.log("Minutes: ", minutes);
  switch (minutes) {
    case 60:
      return {
        timeOfWork: 25,
        timeFree: 5
      };
    case 45:
      return {
        timeOfWork: 15,
        timeFree: 5
      };
    default:
      return {
        timeOfWork: 20,
        timeFree: 10
      };
  }
}
