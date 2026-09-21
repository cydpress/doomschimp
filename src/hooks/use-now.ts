import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  let timeoutId = 0;

  const loop = () => {
    timeoutId = window.setTimeout(() => {
      onChange();
      loop();
    }, 1000 - (Date.now() % 1000));
  };

  loop();
  return () => window.clearTimeout(timeoutId);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

export function useNow(): Date | null {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (seconds === 0) return null;
  return new Date(seconds * 1000);
}
