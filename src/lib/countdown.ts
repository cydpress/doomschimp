import { addDays, addMonths, differenceInDays, differenceInMonths } from "date-fns";

export const BIRTH_MONTH = 1;
export const BIRTH_DAY = 20;
export const HOLD_DAYS = 7;

export type UnitKey = "months" | "days" | "hours" | "minutes" | "seconds";

export const UNITS: { key: UnitKey; label: string }[] = [
  { key: "months", label: "Months" },
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export const ZERO_VALUES: Record<UnitKey, number> = {
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const COMING_OF_AGE = [
  "And with the turning of the final page of childhood, something within him has gone quiet. He no longer laughs. Not because the world has become less amusing, but because he has finally understood that laughter was never meant to last.",
  "The years he once thought were infinite have revealed themselves to be nothing more than borrowed moments, quietly disappearing while he was busy living them.",
  "At 17, he was still a boy pretending he had forever. At 18, he is a grown-ass man, and forever has become a deadline.",
  "The jokes remain. The memories remain. Even the person he used to be remains somewhere in the distant corners of his mind. But he cannot return to him.",
  "Mrchimp has crossed the invisible line between childhood and adulthood, and there is no ceremony for it. No music. No warning. Just the quiet realization that the boy who laughed without thinking is gone.",
  "And perhaps that is what growing up truly is: Not learning how to become an adult, but slowly becoming a stranger to the person you once were.",
] as const;

export type Countdown = {
  isComplete: boolean;
  target: Date;
  last: Date;
  progress: number;
  values: Record<UnitKey, number>;
};

export function birthdayOn(year: number): Date {
  return new Date(year, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0, 0);
}

export function holdEndOn(year: number): Date {
  return addDays(birthdayOn(year), HOLD_DAYS);
}

export function isHoldPeriod(now: Date): boolean {
  const start = birthdayOn(now.getFullYear());
  const end = holdEndOn(now.getFullYear());
  const t = now.getTime();
  return t >= start.getTime() && t < end.getTime();
}

export function nextBirthdayAt(now: Date): Date {
  const thisYear = birthdayOn(now.getFullYear());
  const holdEnd = holdEndOn(now.getFullYear());
  if (now.getTime() < holdEnd.getTime()) return thisYear;
  return birthdayOn(now.getFullYear() + 1);
}

export function lastBirthdayAt(now: Date): Date {
  const thisYear = birthdayOn(now.getFullYear());
  if (now.getTime() >= thisYear.getTime()) return thisYear;
  return birthdayOn(now.getFullYear() - 1);
}

export function getCountdown(now: Date): Countdown {
  const target = nextBirthdayAt(now);
  const last = lastBirthdayAt(now);
  const span = target.getTime() - last.getTime();
  const progress =
    span <= 0 ? 1 : Math.min(1, Math.max(0, (now.getTime() - last.getTime()) / span));

  if (isHoldPeriod(now)) {
    return {
      isComplete: true,
      target,
      last,
      progress: 1,
      values: { ...ZERO_VALUES },
    };
  }

  const months = Math.max(0, differenceInMonths(target, now));
  const afterMonths = addMonths(now, months);
  const days = Math.max(0, differenceInDays(target, afterMonths));
  const afterDays = addDays(afterMonths, days);
  const remainingMs = Math.max(0, target.getTime() - afterDays.getTime());
  const hours = Math.floor(remainingMs / 3_600_000);
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000);
  const seconds = Math.floor((remainingMs % 60_000) / 1_000);

  return {
    isComplete: false,
    target,
    last,
    progress,
    values: { months, days, hours, minutes, seconds },
  };
}

export function formatUnit(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatTargetDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
