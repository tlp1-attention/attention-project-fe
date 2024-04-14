import "./Timer.css";
import { formatTime } from "@utils/formatTime";

type TimerProps = {
  title: string;
  currentTime: number;
  strokeColor: TimerClockProps["strokeColor"];
  /** Total time to the timer to be run on */
  totalTime: number;
};

export function Timer({
  title,
  currentTime,
  strokeColor,
  totalTime
}: TimerProps) {
  const percentagePassed = (currentTime * 100) / totalTime;
  return (
    <section className="m-4 flex-grow-1 w-auto d-flex justify-content-start align-items-center flex-column border shadow p-4">
      <h3 className="fs-2 fw-medium text-uppercase mt-2">{title}</h3>
      <TimerClock
        strokeColor={strokeColor}
        currentTime={currentTime}
        percentagePassed={percentagePassed}
      />
    </section>
  );
}

type TimerClockProps = {
  strokeColor: "green" | "blue";
  /** Current time for the clock in seconds */
  currentTime: number;
  /** Percentage of time passed, considering the total time of the timer */
  percentagePassed: number;
};

function TimerClock({
  strokeColor,
  currentTime,
  percentagePassed
}: TimerClockProps) {
  const formatted = formatTime(currentTime);

  return (
    <div className="position-relative timer d-flex justify-content-center align-items-center m-auto">
      <svg className="flex-shrink-0" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          className="bg-circle"
        />
        <path
          d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          id="free-progress"
          className={`stroke-${strokeColor}`}
          strokeDashoffset={percentagePassed - 100}
        />
      </svg>
      <span id="free" className="timer-text">
        {formatted}
      </span>
    </div>
  );
}
