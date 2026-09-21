import { useEffect, useRef } from "react";

const ROMANS = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"] as const;
const NUMERAL_RADIUS = 58;

function numeralPosition(index: number) {
  const angle = ((index * 30 - 90) * Math.PI) / 180;
  return {
    x: 100 + NUMERAL_RADIUS * Math.cos(angle),
    y: 100 + NUMERAL_RADIUS * Math.sin(angle),
  };
}

export function GothicClock({ complete }: { complete: boolean }) {
  const hourRef = useRef<SVGGElement>(null);
  const minuteRef = useRef<SVGGElement>(null);
  const secondRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds() + ms / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      hourRef.current?.setAttribute("transform", `rotate(${hours * 30})`);
      minuteRef.current?.setAttribute("transform", `rotate(${minutes * 6})`);
      secondRef.current?.setAttribute("transform", `rotate(${seconds * 6})`);

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={"clock-stage" + (complete ? " clock-stage-complete" : "")}
      aria-hidden="true"
    >
      <img
        src="/gothic-clock.jpg"
        alt=""
        className="clock-face"
        draggable={false}
        decoding="async"
      />
      <svg className="clock-hands" viewBox="0 0 200 200">
        {ROMANS.map((label, index) => {
          const { x, y } = numeralPosition(index);
          return (
            <text key={label} className="clock-numeral" x={x} y={y} fontSize={11}>
              {label}
            </text>
          );
        })}
        <g transform="translate(100 100)">
          <g ref={hourRef}>
            <line className="clock-hand clock-hand-hour" x1="0" y1="10" x2="0" y2="-36" />
          </g>
          <g ref={minuteRef}>
            <line className="clock-hand clock-hand-minute" x1="0" y1="14" x2="0" y2="-52" />
          </g>
          <g ref={secondRef}>
            <line className="clock-hand clock-hand-second" x1="0" y1="18" x2="0" y2="-58" />
          </g>
          <circle className="clock-cap" cx="0" cy="0" r="3.2" />
        </g>
      </svg>
    </div>
  );
}
