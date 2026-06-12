/** A copy field in both languages — both required (ADR 0006). */
export type Localized = {
  ko: string;
  en: string;
};

export type Lang = keyof Localized; // 'ko' | 'en'

/** Hero */
export type Headline = {
  lead: Localized; // "IDC 랙에서"
  accent: Localized; // "AI 에이전트까지" — rendered in amber
};

export type FlowChip = {
  id: string;
  label: string; // rack → kernel → … (language-neutral)
};

/** 01 Stack — component-bank grid */
export type StackItem = {
  id: string;
  category: Localized; // "언어" / "Languages"
  label: Localized; // "Rust"
};

/** 02 Now — current work cards */
export type NowItem = {
  id: string;
  name: Localized; // "Umbra"
  tag: Localized; // "개발 중" — amber Tag
  desc: Localized; // **bold** markers allowed
};

/** 03 Planned — project plan cards */
export type PlannedItem = {
  id: string;
  kind: Localized; // "웹" / "WEB" — mono type label
  track: "main" | "side"; // side gets the dashed side-project tag
  title: Localized;
  body: Localized;
};

/** 04 Contrib — open source cards */
export type ContribItem = {
  id: string;
  kind: Localized; // "OSS"
  title: Localized;
  body: Localized;
};

/** 05 Career — timeline */
export type HistoryItem = {
  id: string;
  year: string; // "2026" — language-neutral
  title: Localized;
  body: Localized;
};

/** Footer contacts */
export type ContactLink = {
  id: string;
  key: string; // "github" — mono silkscreen label, language-neutral
  value: string; // "@rowen"
  href: string; // explicit — no derivation logic
};

/** The whole profile — single source of content. */
export type ProfileData = {
  badge: Localized; // "Luxtra 공동창업자 · 서울"
  headline: Headline;
  bio: Localized; // **bold** markers allowed
  flow: FlowChip[];
  stack: StackItem[];
  now: NowItem[];
  planned: PlannedItem[];
  contrib: ContribItem[];
  history: HistoryItem[];
  contact: ContactLink[];
  personal: Localized; // footer one-liner
};

/** Site chrome labels (nav, headings, cta) — copy, so it lives in content/. */
export type UiStrings = {
  nav: {
    stack: Localized;
    projects: Localized;
    career: Localized;
    langLabel: Localized; // sr-only legend for the language toggle
  };
  headings: {
    stack: Localized;
    now: Localized;
    planned: Localized;
    contrib: Localized;
    career: Localized;
  };
  cta: Localized; // "연락하기"
  tags: {
    plan: Localized; // "계획"
    side: Localized; // "사이드"
    oss: Localized; // "기여 예정"
  };
};
