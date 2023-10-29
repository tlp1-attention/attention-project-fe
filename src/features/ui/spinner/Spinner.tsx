import { Orbit } from "@uiball/loaders";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={className ?? ''}>
      <Orbit size={40} color="#36498c" />
    </div>
  );
}
