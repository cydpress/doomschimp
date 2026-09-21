import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as addDays, n as differenceInDays, r as addMonths, t as differenceInMonths } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cg819J2W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function subscribe(onChange) {
	let timeoutId = 0;
	const loop = () => {
		timeoutId = window.setTimeout(() => {
			onChange();
			loop();
		}, 1e3 - Date.now() % 1e3);
	};
	loop();
	return () => window.clearTimeout(timeoutId);
}
function getSnapshot() {
	return Math.floor(Date.now() / 1e3);
}
function getServerSnapshot() {
	return 0;
}
function useNow() {
	const seconds = (0, import_react.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);
	if (seconds === 0) return null;
	return /* @__PURE__ */ new Date(seconds * 1e3);
}
var UNITS = [
	{
		key: "months",
		label: "Months"
	},
	{
		key: "days",
		label: "Days"
	},
	{
		key: "hours",
		label: "Hours"
	},
	{
		key: "minutes",
		label: "Minutes"
	},
	{
		key: "seconds",
		label: "Seconds"
	}
];
function isBirthdayDate(date) {
	return date.getMonth() === 1 && date.getDate() === 20;
}
function birthdayOn(year) {
	return new Date(year, 1, 20, 0, 0, 0, 0);
}
function nextBirthdayAt(now) {
	const thisYear = birthdayOn(now.getFullYear());
	if (now.getTime() < thisYear.getTime()) return thisYear;
	if (isBirthdayDate(now)) return thisYear;
	return birthdayOn(now.getFullYear() + 1);
}
function lastBirthdayAt(now) {
	const thisYear = birthdayOn(now.getFullYear());
	if (isBirthdayDate(now) || now.getTime() >= thisYear.getTime()) return thisYear;
	return birthdayOn(now.getFullYear() - 1);
}
function getCountdown(now) {
	const target = nextBirthdayAt(now);
	const last = lastBirthdayAt(now);
	const span = target.getTime() - last.getTime();
	const progress = span <= 0 ? 1 : Math.min(1, Math.max(0, (now.getTime() - last.getTime()) / span));
	if (isBirthdayDate(now)) return {
		isToday: true,
		target,
		last,
		progress: 1,
		values: {
			months: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		}
	};
	const months = Math.max(0, differenceInMonths(target, now));
	const afterMonths = addMonths(now, months);
	const days = Math.max(0, differenceInDays(target, afterMonths));
	const afterDays = addDays(afterMonths, days);
	const remainingMs = Math.max(0, target.getTime() - afterDays.getTime());
	return {
		isToday: false,
		target,
		last,
		progress,
		values: {
			months,
			days,
			hours: Math.floor(remainingMs / 36e5),
			minutes: Math.floor(remainingMs % 36e5 / 6e4),
			seconds: Math.floor(remainingMs % 6e4 / 1e3)
		}
	};
}
function formatUnit(value) {
	return String(value).padStart(2, "0");
}
function formatTargetDate(date) {
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function FlipDigits({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex whitespace-nowrap tabular-nums",
		children: value.split("").map((digit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "digit-pop",
			children: digit
		}, `${index}-${digit}`))
	});
}
function UnitCell({ unit, value, ready }) {
	const label = UNITS.find((item) => item.key === unit)?.label ?? unit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-2 px-2 sm:px-5 " + (unit === "seconds" ? "col-span-2 sm:col-span-1 " : "") + (unit !== "seconds" ? "sm:border-r sm:border-line " : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "whitespace-nowrap font-sans text-count font-light tracking-count text-foreground",
			"aria-hidden": "true",
			children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlipDigits, { value: formatUnit(value) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-subtle",
				children: "––"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-sans text-label font-medium uppercase tracking-label text-muted",
			children: label
		})]
	});
}
function CountdownView() {
	const now = useNow();
	const countdown = now ? getCountdown(now) : null;
	const ready = countdown !== null;
	const isToday = countdown?.isToday ?? false;
	const values = countdown?.values ?? {
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};
	const dateLabel = countdown ? formatTargetDate(countdown.target) : "February 20";
	const remainingPhrase = countdown ? `${formatUnit(values.months)} months, ${formatUnit(values.days)} days, ${formatUnit(values.hours)} hours, ${formatUnit(values.minutes)} minutes, ${formatUnit(values.seconds)} seconds` : "loading";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "stage relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden px-5 py-16 pb-28 sm:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex w-full max-w-5xl flex-col items-center text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "reveal reveal-1 flex items-center gap-3 font-sans text-kicker font-medium uppercase tracking-kicker text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-1.5 shrink-0 rounded-full bg-accent " + (isToday ? "" : "pulse-dot"),
						"aria-hidden": "true"
					}), isToday ? "It is the birthday of" : "Until the birthday of"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "reveal reveal-2 mt-6 font-display text-name font-medium tracking-name text-foreground italic",
					children: "Mrchimp"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reveal reveal-3 mt-8 flex w-full max-w-md items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-1.5 rotate-45 bg-accent",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
					]
				}),
				isToday ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "reveal reveal-4 mt-10 max-w-sm font-sans text-date font-light text-accent",
					children: "Happy birthday. The next countdown begins at midnight."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reveal reveal-4 mt-12 grid w-full max-w-5xl grid-cols-2 gap-y-10 sm:grid-cols-5 sm:gap-y-0",
					role: "timer",
					"aria-live": "off",
					"aria-label": ready ? `Time remaining until Mrchimp's birthday on ${dateLabel}: ${remainingPhrase}` : "Loading countdown",
					children: UNITS.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitCell, {
						unit: unit.key,
						value: values[unit.key],
						ready
					}, unit.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "reveal reveal-5 mt-14 font-sans text-date font-light tracking-wide text-muted",
					children: dateLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-sans text-label uppercase tracking-label text-subtle",
					children: "Local time"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-line",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "year-fill h-px bg-accent",
				style: { transform: `scaleX(${countdown?.progress ?? 0})` }
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountdownView, {});
}
//#endregion
export { Home as component };
