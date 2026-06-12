import { uiSchema } from "./schema";
import type { UiStrings } from "./types";

const strings: UiStrings = {
  nav: {
    stack: { ko: "기술", en: "Skills" },
    projects: { ko: "프로젝트", en: "Projects" },
    career: { ko: "경력", en: "Career" },
  },
  headings: {
    stack: { ko: "기술 스택", en: "Skills" },
    now: { ko: "지금 만들고 있는 것", en: "Building now" },
    planned: { ko: "프로젝트 계획", en: "Project plans" },
    contrib: { ko: "오픈소스 기여", en: "Open source" },
    career: { ko: "경력", en: "Career" },
  },
  cta: { ko: "연락하기", en: "Contact" },
  tags: {
    plan: { ko: "계획", en: "planned" },
    side: { ko: "사이드", en: "side" },
    oss: { ko: "기여 예정", en: "upcoming" },
  },
};

/** Validated at import time, same gate as the profile data. */
export const ui: UiStrings = uiSchema.parse(strings);
