export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const formattedSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
}
