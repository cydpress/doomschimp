import { GothicClock } from "@/components/gothic-clock";
import { useNow } from "@/hooks/use-now";
import {
  COMING_OF_AGE,
  formatTargetDate,
  formatUnit,
  getCountdown,
  UNITS,
  type UnitKey,
} from "@/lib/countdown";

function FlipDigits({ value }: { value: string }) {
  return (
    <span className="inline-flex whitespace-nowrap tabular-nums">
      {value.split("").map((digit, index) => (
        <span key={`${index}-${digit}`} className="digit-pop">
          {digit}
        </span>
      ))}
    </span>
  );
}

function UnitCell({
  unit,
  value,
  ready,
  complete,
}: {
  unit: UnitKey;
  value: number;
  ready: boolean;
  complete: boolean;
}) {
  const label = UNITS.find((item) => item.key === unit)?.label ?? unit;
  const isSeconds = unit === "seconds";

  return (
    <div
      className={
        "flex flex-col items-center gap-2 px-2 sm:px-5 " +
        (isSeconds ? "col-span-2 sm:col-span-1 " : "") +
        (unit !== "seconds" ? "sm:border-r sm:border-line " : "")
      }
    >
      <div
        className={
          "whitespace-nowrap font-sans text-count font-light tracking-count " +
          (complete ? "text-crimson" : "text-foreground")
        }
        aria-hidden="true"
      >
        {ready ? <FlipDigits value={formatUnit(value)} /> : <span className="text-subtle">––</span>}
      </div>
      <div
        className={
          "font-sans text-label font-medium uppercase tracking-label " +
          (complete ? "text-crimson" : "text-muted")
        }
      >
        {label}
      </div>
    </div>
  );
}

export function CountdownView() {
  const now = useNow();
  const countdown = now ? getCountdown(now) : null;
  const ready = countdown !== null;
  const isComplete = countdown?.isComplete ?? false;

  const values = countdown?.values ?? {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const dateLabel = countdown ? formatTargetDate(countdown.target) : "February 20";

  const remainingPhrase = isComplete
    ? "Zero. Mrchimp is now 18."
    : countdown
      ? `${formatUnit(values.months)} months, ${formatUnit(values.days)} days, ${formatUnit(values.hours)} hours, ${formatUnit(values.minutes)} minutes, ${formatUnit(values.seconds)} seconds`
      : "loading";

  return (
    <main
      className={
        "stage relative flex min-h-dvh flex-col items-center overflow-x-hidden px-5 py-16 pb-28 sm:px-8 " +
        (isComplete ? "justify-start sm:justify-center" : "justify-center")
      }
    >
      <GothicClock complete={isComplete} />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <p
          className={
            "reveal reveal-1 flex items-center gap-3 font-sans text-kicker font-medium uppercase tracking-kicker " +
            (isComplete ? "text-crimson" : "text-muted")
          }
        >
          <span
            className={
              "size-1.5 shrink-0 rounded-full " +
              (isComplete ? "bg-crimson" : "bg-accent pulse-dot")
            }
            aria-hidden="true"
          />
          {isComplete ? "Mrchimp is now 18" : "Until the birthday of"}
        </p>

        <h1
          className={
            "reveal reveal-2 mt-6 font-display text-name font-medium tracking-name italic " +
            (isComplete ? "text-crimson" : "text-foreground")
          }
        >
          Mrchimp
        </h1>

        <div className="reveal reveal-3 mt-8 flex w-full max-w-md items-center gap-4">
          <span className={"h-px flex-1 " + (isComplete ? "bg-crimson" : "bg-line")} />
          <span
            className={"size-1.5 rotate-45 " + (isComplete ? "bg-crimson" : "bg-accent")}
            aria-hidden="true"
          />
          <span className={"h-px flex-1 " + (isComplete ? "bg-crimson" : "bg-line")} />
        </div>

        <div
          className="reveal reveal-4 mt-12 grid w-full max-w-5xl grid-cols-2 gap-y-10 sm:grid-cols-5 sm:gap-y-0"
          role="timer"
          aria-live="off"
          aria-label={
            ready
              ? isComplete
                ? remainingPhrase
                : `Time remaining until Mrchimp's birthday on ${dateLabel}: ${remainingPhrase}`
              : "Loading countdown"
          }
        >
          {UNITS.map((unit) => (
            <UnitCell
              key={unit.key}
              unit={unit.key}
              value={values[unit.key]}
              ready={ready}
              complete={isComplete}
            />
          ))}
        </div>

        {isComplete ? (
          <article className="reveal reveal-5 mt-14 w-full max-w-2xl text-left">
            {COMING_OF_AGE.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-5 font-display text-essay font-normal text-pretty text-foreground last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </article>
        ) : null}

        <p
          className={
            "mt-14 font-sans text-date font-light tracking-wide " +
            (isComplete ? "text-crimson" : "text-muted reveal reveal-5")
          }
        >
          {dateLabel}
        </p>
        <p className="mt-3 font-sans text-label uppercase tracking-label text-subtle">
          {isComplete ? "Held at zero for seven days" : "Local time"}
        </p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-line"
        aria-hidden="true"
      >
        <div
          className={"year-fill h-px " + (isComplete ? "bg-crimson" : "bg-accent")}
          style={{
            transform: `scaleX(${countdown?.progress ?? 0})`,
          }}
        />
      </div>
    </main>
  );
}
