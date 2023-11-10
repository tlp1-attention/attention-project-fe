import { Orbit } from "@uiball/loaders";

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={className ?? ""}>
      <Orbit size={40} color="#36498c" />
    </div>
  );
}

export function FullSizeSpinner({ className }: { className?: string }) {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner className={className} />
    </div>
  );
}
