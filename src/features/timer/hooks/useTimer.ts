import { useState, useEffect } from "react";

type UseTimerValue = [
    number,
    {
        pause: () => void,
        setSeconds: React.Dispatch<React.SetStateAction<number>>
    }
]

export function useTimer(initialSeconds: number | (() => number), onTimeout?: () => void): UseTimerValue {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
        if (seconds == 0) {
          onTimeout && onTimeout();
          return;
        }
        if (paused) return;
        setSeconds(seconds -  1);
    }, 10_000);

    return () => clearInterval(interval);
  });

  const pause = () => setPaused(true);

  return [seconds, { pause, setSeconds }];
}
