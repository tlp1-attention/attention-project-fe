import { MODES } from "../reducer/timerReducer";

/**
 * Takes a total time in minutes and automatically divides them in
 * a bunch of intervals of work time and free time
 */
export function divideTime(minutes: number) {
  const intervals = [];

  const { timeOfWork, timeFree } = getTimerConfig(minutes);
  let timeTaken = 0;
  let i = 0;

  while (timeTaken < minutes) {
    if (i % 2 == 0) {
      intervals.push({
        timeInMins: timeOfWork,
        mode: MODES.WORK
      });
      timeTaken += timeOfWork;
    } else {
      intervals.push({
        timeInMins: timeFree,
        mode: MODES.FREE
      });
      timeTaken += timeFree;
    }
    i++;
  }
  return intervals;
}

/**
 * Gets the configuration of free and work time
 * using the minutes it receives
 */
function getTimerConfig(minutes: number) {
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
