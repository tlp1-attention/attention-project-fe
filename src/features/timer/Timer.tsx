import './Timer.css';

type TimerProps = {
    title: string;
    currentTime: number;
    strokeColor: TimerClockProps["strokeColor"]
}

export function Timer({ title, currentTime, strokeColor }: TimerProps) {
  return (
    <section className="m-4 flex-grow-1 w-auto d-flex justify-content-start align-items-center flex-column border shadow p-4">
      <h3 className="fs-2 fw-medium text-uppercase mt-2">{ title }</h3>
      <TimerClock strokeColor={strokeColor} currentTime={currentTime} />
    </section>
  );
}

type TimerClockProps = {
    strokeColor: "green" | "blue";
    /** Current time for the clock in seconds */
    currentTime: number;
}

function TimerClock({ strokeColor, currentTime }: TimerClockProps) {
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
          />
        </svg>
        <span id="free" className="timer-text">
            { formatted }
        </span>
      </div>
   ) 
}

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const formattedSeconds = (seconds % 60).toString().padStart(2, '0');

    return `${minutes}:${formattedSeconds}`;
}