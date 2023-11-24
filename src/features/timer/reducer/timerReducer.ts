import { divideTime } from "../utils/divideTime";

export const TIMER_ACTIONS = {
  INTERVALS: {
    NEXT: "NEXT_INTERVAL",
    RESET: "RESET_TOTAL_MINS"
  },

  INTERVAL_INDEX: {
    ADD: "ADD_INTERVAL_INDEX",
    RESET: "RESET_INTERVAL_INDEX"
  },

  SECONDS: {
    SET: "SET_SECONDS"
  },

  TOTAL_MINUTES: {
    SET: "SET_TOTAL_MINS",
  }
} as const;

type TimerActions =
  | {
      type: typeof TIMER_ACTIONS.INTERVALS.NEXT;
    }
  | {
      type: typeof TIMER_ACTIONS.INTERVAL_INDEX.ADD;
      payload: Interval;
    }
  | {
      type: typeof TIMER_ACTIONS.INTERVAL_INDEX.RESET;
    }
  | {
      type: typeof TIMER_ACTIONS.SECONDS.SET;
      payload: number;
    }
  | {
      type: typeof TIMER_ACTIONS.TOTAL_MINUTES.SET;
      payload: number;
    }
  | {
    type: typeof TIMER_ACTIONS.INTERVALS.RESET,
  }

type TimerInterval = {
  /** Time in minutes */
  timeInMins: number;
  /** The mode of the timer when this interval is running */
  mode: typeof MODES[keyof typeof MODES];
};

/**
 * Available modes for a Timer: 'Free' and 'Work'
 */
export const MODES = {
  WORK: "Work",
  FREE: "Free"
} as const;

type TimerState = {
  /** The current time in seconds */
  seconds: number;
  /** The current timer running */

  intervalIndex: number;

  /** The time to divide between the two clocks */
  totalMins: number;
  /** All the current intervals */
  intervals: TimerInterval[];

  /** The current mode of the timer */
  mode: typeof MODES[keyof typeof MODES] | null;

  /** The current *free* time. 0 if its work mode */
  freeTime: number;

  /** The current *work* time. 0 if its free mode */
  workTime: number;
};

export const DEFAULT_STATE = {
  seconds: 0,
  intervalIndex: 0,
  intervals: [],
  totalMins: 0,
  freeTime: 0,
  workTime: 0,
  mode: null
};

export function timerReducer(state: TimerState | null, action: TimerActions): TimerState {
  if (!state) return DEFAULT_STATE;
  switch (action.type) {
    case TIMER_ACTIONS.INTERVALS.NEXT: {
      if (state.intervalIndex == state.intervals.length - 1) {
        return { ...DEFAULT_STATE }
      }
      console.log('intervals: ', state.intervals);
      console.log('index: ', state.intervalIndex);
      return {
        ...state,
        intervalIndex: state.intervalIndex + 1,
        mode: state.intervals[state.intervalIndex + 1].mode,
        freeTime: state.intervals[state.intervalIndex + 1].mode == MODES.FREE ? state.intervals[state.intervalIndex + 1].timeInMins : 0,
        workTime: state.intervals[state.intervalIndex + 1].mode == MODES.WORK ? state.intervals[state.intervalIndex + 1].timeInMins : 0,
        seconds: state.intervals[state.intervalIndex + 1].mode == MODES.FREE ? state.intervals[state.intervalIndex + 1].timeInMins * 60 : state.intervals[state.intervalIndex + 1].timeInMins * 60
      };
    }
    case TIMER_ACTIONS.SECONDS.SET:
      return {
        ...state,
        seconds: action.payload
      };
    case TIMER_ACTIONS.INTERVALS.RESET:
        return { ... DEFAULT_STATE }
    case TIMER_ACTIONS.TOTAL_MINUTES.SET: {
      const intervals = divideTime(action.payload);
      return {
        ...state,
        totalMins: action.payload,
        intervals: intervals,
        intervalIndex: 0,
        mode: intervals[0].mode,
        freeTime: intervals[0].mode == MODES.FREE ? intervals[0].timeInMins : 0,
        workTime: intervals[0].mode == MODES.WORK ? intervals[0].timeInMins : 0,
        seconds: intervals[0].mode == MODES.FREE ? intervals[0].timeInMins * 60 : intervals[0].timeInMins * 60
      };
    }
    default:
      return { ...DEFAULT_STATE };
  }
}
