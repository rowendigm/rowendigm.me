import type { ReactElement } from "react";

/** Copper trace field — hand-routed power network converging on the hero
 *  controller pad. Path data ports the settled design; styling lives in
 *  the traces block of globals.css. Decorative only. */
const vias: [number, number][] = [
  [140, 150],
  [196, 206],
  [96, 372],
  [176, 292],
  [264, 60],
  [348, 202],
  [470, 108],
  [496, 250],
  [556, 310],
  [852, 370],
  [1180, 604],
  [420, 720],
  [470, 770],
  [1240, 664],
  [180, 470],
  [540, 406],
  [520, 560],
];

const denseVias: [number, number][] = [
  [80, 560],
  [140, 500],
  [680, 180],
  [1260, 460],
  [460, 290],
  [900, 250],
  [960, 190],
  [580, 940],
  [1120, 1020],
  [420, 250],
];

function TraceField({ dense = false }: { dense?: boolean }): ReactElement {
  return (
    <div className="trace-field" aria-hidden>
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 1280"
        preserveAspectRatio="xMidYMin slice"
      >
        <path
          className="tr warm"
          d="M300,250 H496 L556,310 H792 L852,370 V604 H1180 L1240,664 H1440"
        />
        <path
          className="trace-flow"
          d="M300,250 H496 L556,310 H792 L852,370 V604 H1180 L1240,664 H1440"
        />
        <path className="tr bright" d="M0,150 H140 L196,206 H300" />
        <path className="tr bright" d="M0,372 H96 L176,292 H252 L300,250" />
        <path className="tr" d="M300,250 V96 L264,60 V0" />
        <path className="tr" d="M300,250 L348,202 V108 H470 L512,66 V0" />
        <path className="tr" d="M0,250 H120" />
        <path className="tr warm" d="M0,470 H180 L300,406 H540" />
        <path className="tr" d="M120,720 H420 L470,770 H700" />
        <path className="tr" d="M1440,300 H1240 L1180,360 H980" />
        <path className="tr" d="M1440,880 H1120 L1060,820 H820 L770,870 H560" />
        <path className="tr" d="M300,250 L300,560 H520" />
        <path
          className="trace-live"
          d="M0,250 H120 M300,250 L348,202 V108 H470"
        />
        <rect
          className="ctrl-pad"
          x="284"
          y="234"
          width="32"
          height="32"
          rx="2"
        />
        <circle className="ctrl-core" cx="300" cy="250" r="3.4" />
        {vias.map(([cx, cy]) => (
          <circle key={`${cx},${cy}`} className="via" cx={cx} cy={cy} r="3.2" />
        ))}
        <circle className="via hot" cx="300" cy="250" r="4.2" />
        <circle className="via hot" cx="496" cy="250" r="3.6" />
        {dense && (
          <g>
            <path className="tr" d="M0,560 H80 L140,500 H300" />
            <path className="tr" d="M620,0 V120 L680,180 V300" />
            <path className="tr" d="M1440,520 H1320 L1260,460 H1040" />
            <path className="tr" d="M300,250 L420,250 L460,290 V440" />
            <path className="tr bright" d="M740,250 H900 L960,190 H1120" />
            <path className="tr" d="M200,1000 H520 L580,940 H880" />
            <path className="tr" d="M1440,1080 H1180 L1120,1020 H900" />
            <rect
              className="pad-comp"
              x="612"
              y="300"
              width="26"
              height="12"
              rx="1.5"
            />
            <rect
              className="pad-comp"
              x="958"
              y="184"
              width="12"
              height="26"
              rx="1.5"
            />
            <rect
              className="pad-comp"
              x="454"
              y="436"
              width="12"
              height="26"
              rx="1.5"
            />
            <rect
              className="pad-comp"
              x="1036"
              y="454"
              width="26"
              height="12"
              rx="1.5"
            />
            <rect
              className="pad-comp"
              x="576"
              y="934"
              width="26"
              height="12"
              rx="1.5"
            />
            {denseVias.map(([cx, cy]) => (
              <circle
                key={`${cx},${cy}`}
                className="via"
                cx={cx}
                cy={cy}
                r="2.8"
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}

/** Substrate pattern + hero trace field + mirrored bottom field. */
export function BackgroundTraces(): ReactElement {
  return (
    <>
      <div className="trace-substrate" aria-hidden>
        <div className="ts-in" />
      </div>
      <TraceField />
      <div className="trace-bottom" aria-hidden>
        <TraceField dense />
      </div>
    </>
  );
}
