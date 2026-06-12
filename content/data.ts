import { profileSchema } from "./schema";
import type { ProfileData } from "./types";

const data: ProfileData = {
  badge: { ko: "Luxtra 공동창업자 · 서울", en: "Co-founder, Luxtra · Seoul" },
  headline: {
    lead: { ko: "IDC 랙에서", en: "From datacenter racks to" },
    accent: { ko: "AI 에이전트까지", en: "AI agents" },
  },
  bio: {
    ko: "데이터센터에서 직접 서버를 랙에 꽂고 배선했습니다. 이제는 그 위에서 돌아가는 지능을 만듭니다. **리눅스 커널**부터 **AI 에이전트**까지.",
    en: "I racked and wired servers by hand in datacenters. Now I build the intelligence that runs on top of them, from the **Linux kernel** up to **AI agents**.",
  },
  flow: [
    { id: "flow-rack", label: "rack" },
    { id: "flow-kernel", label: "kernel" },
    { id: "flow-runtime", label: "runtime" },
    { id: "flow-agents", label: "agents" },
  ],
  stack: [
    {
      id: "st-rust",
      category: { ko: "언어", en: "Languages" },
      label: { ko: "Rust", en: "Rust" },
    },
    {
      id: "st-c",
      category: { ko: "언어", en: "Languages" },
      label: { ko: "C", en: "C" },
    },
    {
      id: "st-kernel",
      category: { ko: "시스템", en: "Systems" },
      label: { ko: "리눅스 커널", en: "Linux kernel" },
    },
    {
      id: "st-embedded",
      category: { ko: "시스템", en: "Systems" },
      label: { ko: "임베디드", en: "Embedded" },
    },
    {
      id: "st-iouring",
      category: { ko: "시스템", en: "Systems" },
      label: { ko: "io_uring · eBPF", en: "io_uring · eBPF" },
    },
    {
      id: "st-k8s",
      category: { ko: "인프라", en: "Infra" },
      label: { ko: "쿠버네티스", en: "Kubernetes" },
    },
    {
      id: "st-gpu",
      category: { ko: "인프라", en: "Infra" },
      label: { ko: "GPU 노드", en: "GPU nodes" },
    },
    {
      id: "st-selfhost",
      category: { ko: "인프라", en: "Infra" },
      label: { ko: "자체 호스팅", en: "Self-hosted" },
    },
    {
      id: "st-llm",
      category: { ko: "AI", en: "AI" },
      label: { ko: "LLM 학습", en: "LLM training" },
    },
    {
      id: "st-agents",
      category: { ko: "AI", en: "AI" },
      label: { ko: "에이전트", en: "Agents" },
    },
    {
      id: "st-nabi",
      category: { ko: "런타임", en: "Runtime" },
      label: { ko: "Nabi 런타임", en: "Nabi runtime" },
    },
  ],
  now: [
    {
      id: "now-umbra",
      name: { ko: "Umbra", en: "Umbra" },
      tag: { ko: "개발 중", en: "in development" },
      desc: {
        ko: "디스코드 봇. 서버 백업 & 원클릭 복구. 제품화 진행 중.",
        en: "A Discord bot. Backup and one-click recovery for servers. Shipping toward a product.",
      },
    },
  ],
  planned: [
    {
      id: "plan-luxtra-web",
      kind: { ko: "웹", en: "WEB" },
      track: "main",
      title: { ko: "Luxtra 웹사이트", en: "Luxtra website" },
      body: {
        ko: "회사 사이트. 여기서 만든 패턴 재사용.",
        en: "Company site. Reusing patterns built here.",
      },
    },
    {
      id: "plan-ai",
      kind: { ko: "AI", en: "AI" },
      track: "main",
      title: {
        ko: "자체 LLM · 에이전트 · IDE",
        en: "Our own LLM, agents, and IDE",
      },
      body: {
        ko: "자체 학습 모델. 에이전트 프레임워크. 개발 도구. 각각 별개.",
        en: "Self-trained model. Agent framework. Dev tool. Each separate.",
      },
    },
    {
      id: "plan-infra",
      kind: { ko: "인프라", en: "INFRA" },
      track: "main",
      title: { ko: "자체 호스팅 인프라", en: "Self-hosted infrastructure" },
      body: {
        ko: "자체 K8s 클러스터. LLM 학습/추론용 GPU 노드.",
        en: "Own K8s cluster. GPU nodes for LLM training and inference.",
      },
    },
    {
      id: "plan-hw",
      kind: { ko: "HW", en: "HW" },
      track: "side",
      title: {
        ko: "임베디드 Rust → 하드웨어 AI",
        en: "Rust on embedded → AI on hardware",
      },
      body: {
        ko: "개인 사이드 프로젝트. 펌웨어 → 제품 → 상용화.",
        en: "Personal side project. Firmware → product → commercialization.",
      },
    },
  ],
  contrib: [
    {
      id: "oss-nabi",
      kind: { ko: "OSS", en: "OSS" },
      title: { ko: "Nabi 기여 예정", en: "Nabi, planned contribution" },
      body: {
        ko: "Pablo의 Rust 비동기 런타임. 커널 레벨 Tokio 대안. 기여 예정: io_uring, eBPF 내부 구현.",
        en: "Pablo's Rust async runtime, a kernel-level Tokio alternative. Planning to contribute: io_uring and eBPF internals.",
      },
    },
  ],
  history: [
    {
      id: "hist-2026",
      year: "2026",
      title: { ko: "Luxtra 공동창업", en: "Co-founded Luxtra" },
      body: {
        ko: "인프라 우선 AI 회사. 커널부터 에이전트까지 밑바닥부터.",
        en: "Infra-first AI company. Building from the metal up, kernel to agents.",
      },
    },
    {
      id: "hist-2025",
      year: "2025",
      title: {
        ko: "데이터센터 서버 엔지니어",
        en: "Datacenter server engineer",
      },
      body: {
        ko: "서버를 직접 랙에 꽂고 배선하고 운영. 기계를 안에서부터 익힘.",
        en: "Racked, wired, and ran servers by hand. Learned the machine from the inside.",
      },
    },
  ],
  contact: [
    {
      id: "ct-github",
      key: "github",
      value: "@rowendigm",
      href: "https://github.com/rowendigm",
    },
    {
      id: "ct-email",
      key: "email",
      value: "leejinwuk97@gmail.com",
      href: "mailto:leejinwuk97@gmail.com",
    },
  ],
  personal: {
    ko: "키보드 밖에서는 — 산과 러닝",
    en: "Off the keyboard — mountains and running.",
  },
};

/** Validated at import time. An incomplete translation fails the build. */
export const profile: ProfileData = profileSchema.parse(data);
