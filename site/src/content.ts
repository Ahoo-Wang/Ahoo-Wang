// Every word on i.ahoo.me lives in this file. Pages only arrange it.
//
// A `Text` is either one string for every language, or one string per locale.

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export type Text = string | Record<Locale, string>;

export const t = (text: Text, locale: Locale): string => (typeof text === "string" ? text : text[locale]);

export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  en: { htmlLang: "en", ogLocale: "en_US", label: "EN" },
  zh: { htmlLang: "zh-CN", ogLocale: "zh_CN", label: "中文" },
};

// ---------------------------------------------------------------- identity

export const person = {
  name: "Ahoo Wang",
  handle: "Ahoo-Wang",
  email: "ahoowang@gmail.com",
  github: "https://github.com/Ahoo-Wang",
  portrait: "/images/ahoo-wang.jpg",
  role: { en: "Systems Architect & Open-source Builder", zh: "系统架构师与开源作者" },
  knowsAbout: [
    "Artificial Intelligence",
    "Agent Orchestration",
    "Distributed Systems",
    "Domain-Driven Design",
    "CQRS",
    "Event Sourcing",
    "Reactive Systems",
    "Kubernetes",
    "Java",
    "Kotlin",
    "TypeScript",
    "C#",
  ],
};

export const seo = {
  title: {
    en: "Ahoo Wang — Systems Architect & Open-source Builder",
    zh: "Ahoo Wang — 系统架构师与开源作者",
  },
  description: {
    en: "Ahoo Wang is a systems architect building AI agent platforms and distributed systems, and the author of open-source projects Wow, CosId and CoSky (DDD, CQRS, Event Sourcing).",
    zh: "Ahoo Wang，系统架构师，专注 AI 智能体编排与分布式系统，开源项目 Wow、CosId、CoSky 作者，长期实践 DDD、CQRS 与事件溯源。",
  },
};

/** Link-preview image per locale, rendered by scripts/og.mjs. */
export const ogImage = (locale: Locale) => `/images/og-${locale}.png`;

// ---------------------------------------------------------------- page copy

export const copy = {
  skip: { en: "Skip to content", zh: "跳至主要内容" },
  nav: { en: "Primary", zh: "主导航" },
  language: { en: "Language", zh: "语言" },
  sections: {
    work: { en: "Work", zh: "代表作品" },
    principles: { en: "Principles", zh: "工作方式" },
    projects: { en: "Open source", zh: "开源项目" },
    contact: { en: "Contact", zh: "联系" },
  },

  intro: {
    eyebrow: { en: "Systems architect · Open-source builder", zh: "系统架构师 · 开源作者" },
    thesis: { en: "Clear boundaries for complex systems.", zh: "让复杂系统，有清晰的边界。" },
    lede: {
      en: "I design AI agent platforms and distributed systems, and I build the open-source infrastructure under them. I care not just that a system works, but why it works the way it does.",
      zh: "我设计 AI 智能体平台与分布式系统，也构建支撑它们的开源基础设施。我关心系统能否运行，更关心它为什么这样运行。",
    },
    focusLabel: { en: "Now", zh: "正在关注" },
    focus: {
      en: "Agent orchestration engines · Distributed systems · DDD & Event Sourcing",
      zh: "智能体编排引擎 · 分布式系统 · 领域驱动设计与事件溯源",
    },
    email: { en: "Email me", zh: "写信给我" },
  },

  stats: {
    projects: { en: "open-source projects", zh: "个开源项目" },
    stars: { en: "GitHub stars", zh: "GitHub Stars" },
    active: { en: "active in the last 30 days", zh: "近 30 天活跃" },
  },

  // The hero diagram: how a write flows through a Wow service.
  diagram: {
    title: { en: "Wow write path", zh: "Wow 写入链路" },
    description: {
      en: "A command reaches an aggregate, which decides and appends domain events to the event store. The event bus fans those events out to projections, sagas and snapshots.",
      zh: "命令到达聚合根，聚合根做出决策并将领域事件追加到事件存储；事件总线再把事件分发给投影、Saga 与快照。",
    },
  },

  work: {
    title: { en: "Selected work", zh: "代表作品" },
    lede: {
      en: "Three projects, and the decisions behind them.",
      zh: "三个项目，以及它们背后的设计判断。",
    },
    problem: { en: "Problem", zh: "问题" },
    decision: { en: "Decision", zh: "设计" },
    tradeoff: { en: "Trade-off", zh: "边界" },
    benchmark: { en: "Benchmark", zh: "基准" },
    source: { en: "Source", zh: "源码" },
    docs: { en: "Docs", zh: "文档" },
  },

  figures: {
    spec: {
      caption: { en: "A real aggregate spec from the Wow examples", zh: "摘自 Wow 示例中的真实聚合测试" },
      href: "https://github.com/Ahoo-Wang/Wow/blob/main/example/example-domain/src/test/kotlin/me/ahoo/wow/example/domain/cart/CartSpec.kt",
    },
    segments: {
      title: { en: "SegmentChainId · segment chain", zh: "SegmentChainId · 号段链" },
      description: {
        en: "IDs are handed out from the head segment with a lock-free compare-and-set. Behind it, prefetched segments wait in a chain at least a safe distance long. A PrefetchWorker appends new segments from an IdSegmentDistributor backed by Redis, JDBC, ZooKeeper or MongoDB, doubling the prefetch distance when the generator is hungry and halving it when the chain is full.",
        zh: "ID 从链头号段以无锁 CAS 方式分配；其后是已预取的号段，长度不低于安全距离。PrefetchWorker 从 IdSegmentDistributor（Redis、JDBC、ZooKeeper 或 MongoDB）申请新号段追加到链尾：饥饿时预取距离加倍，链充足时减半。",
      },
      hungry: { en: "hungry ×2 · full ÷2", zh: "饥饿 ×2 · 充足 ÷2" },
    },
    bits: {
      title: { en: "SnowflakeId bit layout", zh: "SnowflakeId 位布局" },
      description: {
        en: "A 64-bit ID: 1 unused sign bit, a 41-bit millisecond timestamp (about 69 years), a 10-bit machine ID (1,024 nodes) and a 12-bit sequence (4,096 IDs per millisecond).",
        zh: "64 位 ID：1 位不用的符号位、41 位毫秒时间戳（约 69 年）、10 位机器号（1024 个节点）与 12 位序列号（每毫秒 4096 个 ID）。",
      },
      timestamp: { en: "≈ 69 years", zh: "约 69 年" },
      machine: { en: "1,024 nodes", zh: "1024 个节点" },
      sequence: { en: "4,096 / ms", zh: "4096 / 毫秒" },
    },
    cache: {
      title: { en: "CoSky read path", zh: "CoSky 读取链路" },
      description: {
        en: "Applications read configuration and instances from an in-process cache. Redis Pub/Sub pushes changes into that cache, so only writes and cache misses go over the network to Redis.",
        zh: "应用从进程内缓存读取配置与实例；Redis Pub/Sub 把变更推送进缓存，只有写入和缓存未命中才经过网络访问 Redis。",
      },
    },
  },

  principles: {
    title: { en: "Start with the problem, then choose the tools.", zh: "从问题出发，而不是从工具出发。" },
    lede: {
      en: "I look for the structure behind a problem before choosing the design and technology to express it. Open source keeps those decisions inspectable, debatable and able to evolve.",
      zh: "我先读懂问题背后的结构，再决定用什么设计与技术去表达它。开源让这些判断可以被检验、被讨论、被继续改进。",
    },
    items: [
      {
        title: { en: "Make intent visible", zh: "让意图可见" },
        body: {
          en: "Start from the domain. Express business intent in explicit, testable models.",
          zh: "从领域出发，用显式、可测试的模型表达业务意图。",
        },
      },
      {
        title: { en: "Give change a boundary", zh: "给变化留出边界" },
        body: {
          en: "Make responsibilities and dependencies explicit, so the system can evolve without losing integrity.",
          zh: "把职责与依赖说清楚，让系统演进时仍然可理解、可验证。",
        },
      },
      {
        title: { en: "Let evidence lead", zh: "让证据支持判断" },
        body: {
          en: "Explain a design with code, tests and benchmarks — and state its costs and limits.",
          zh: "用代码、测试与基准说明设计，也明确它的成本与适用边界。",
        },
      },
    ],
  },

  projects: {
    title: { en: "Built in the open", zh: "在开放中构建" },
    lede: {
      en: "Different problems, one engineering mindset.",
      zh: "不同的问题，共同的工程追求。",
    },
    all: { en: "All repositories on GitHub", zh: "GitHub 上的全部仓库" },
    updated: { en: "last push", zh: "最近提交" },
  },

  contact: {
    title: { en: "Good questions deserve thoughtful conversations.", zh: "让好的问题，遇到认真的讨论。" },
    lede: {
      en: "Systems design, agent architecture, open source, or a hard engineering problem — I'd like to hear about it.",
      zh: "系统设计、智能体架构、开源实践，或一个棘手的工程问题——都欢迎来信。",
    },
  },

  notFound: {
    title: { en: "Page not found", zh: "页面不存在" },
    body: { en: "This page doesn't exist, or it has moved.", zh: "这个页面不存在，或已经移动。" },
    home: { en: "Go to the home page", zh: "返回首页" },
  },
};

// ---------------------------------------------------------------- projects

export type Project = {
  name: string;
  repo: string;
  docs?: string;
  summary: Text;
};

export type Group = { title: Text; projects: Project[] };

export const projectGroups: Group[] = [
  {
    title: { en: "Architecture frameworks", zh: "架构框架" },
    projects: [
      {
        name: "Wow",
        repo: "https://github.com/Ahoo-Wang/Wow",
        docs: "https://wow.ahoo.me",
        summary: {
          en: "Reactive DDD, CQRS and Event Sourcing framework — domain model as a service.",
          zh: "基于 DDD、CQRS 与事件溯源的响应式框架——领域模型即服务。",
        },
      },
      {
        name: "CoSec",
        repo: "https://github.com/Ahoo-Wang/CoSec",
        docs: "https://cosec.ahoo.me",
        summary: {
          en: "Multi-tenant reactive security framework built on RBAC and policies.",
          zh: "基于 RBAC 与策略的多租户响应式安全框架。",
        },
      },
      {
        name: "wow-project-template",
        repo: "https://github.com/Ahoo-Wang/wow-project-template",
        summary: {
          en: "Starter template for Domain-Driven Design projects on Wow.",
          zh: "基于 Wow 快速构建领域驱动设计项目的模板。",
        },
      },
    ],
  },
  {
    title: { en: "Distributed infrastructure", zh: "分布式基础设施" },
    projects: [
      {
        name: "CosId",
        repo: "https://github.com/Ahoo-Wang/CosId",
        docs: "https://cosid.ahoo.me",
        summary: {
          en: "Universal, flexible, high-performance distributed ID generator.",
          zh: "通用、灵活、高性能的分布式 ID 生成器。",
        },
      },
      {
        name: "CoSky",
        repo: "https://github.com/Ahoo-Wang/CoSky",
        docs: "https://cosky.ahoo.me",
        summary: {
          en: "Lightweight service discovery and configuration on Redis.",
          zh: "基于 Redis 的轻量级服务注册发现与配置中心。",
        },
      },
      {
        name: "Simba",
        repo: "https://github.com/Ahoo-Wang/Simba",
        docs: "https://simba.ahoo.me",
        summary: {
          en: "Distributed lock service for coordination and scheduling.",
          zh: "面向协调与调度的分布式锁服务。",
        },
      },
      {
        name: "CoCache",
        repo: "https://github.com/Ahoo-Wang/CoCache",
        docs: "https://cocache.ahoo.me",
        summary: {
          en: "Level-two distributed coherence cache.",
          zh: "二级分布式一致性缓存框架。",
        },
      },
    ],
  },
  {
    title: { en: "AI & developer tools", zh: "AI 与开发工具" },
    projects: [
      {
        name: "GodeX",
        repo: "https://github.com/Ahoo-Wang/GodeX",
        docs: "https://godex.ahoo.me",
        summary: {
          en: "OpenAI Responses API gateway that turns any model into a Codex engine.",
          zh: "兼容 OpenAI Responses API 的网关，让每个模型都成为 Codex 引擎。",
        },
      },
      {
        name: "fetcher",
        repo: "https://github.com/Ahoo-Wang/fetcher",
        docs: "https://fetcher.ahoo.me",
        summary: {
          en: "Fetch-based HTTP client ecosystem with native LLM streaming and React support.",
          zh: "基于 Fetch 的 HTTP 客户端生态，原生支持 LLM 流式 API 与 React。",
        },
      },
      {
        name: "Ahoo Skills",
        repo: "https://github.com/Ahoo-Wang/skills",
        docs: "https://skills.ahoo.me",
        summary: {
          en: "Agent skills synced from my projects, packaged as Codex and Claude Code plugins.",
          zh: "从开源项目同步的 Agent Skills，按项目提供 Codex 与 Claude Code 插件。",
        },
      },
      {
        name: "Cobal",
        repo: "https://github.com/Ahoo-Wang/Cobal",
        summary: {
          en: "Load balancing for LLM client SDKs with Resilience4j circuit breakers.",
          zh: "集成 Resilience4j 断路器的 LLM 客户端负载均衡。",
        },
      },
      {
        name: "CoApi",
        repo: "https://github.com/Ahoo-Wang/CoApi",
        docs: "https://coapi.ahoo.me",
        summary: {
          en: "Zero-boilerplate HTTP client definitions for Spring 6.",
          zh: "为 Spring 6 提供零样板的 HTTP 客户端定义与自动配置。",
        },
      },
      {
        name: "FluentAssert",
        repo: "https://github.com/Ahoo-Wang/FluentAssert",
        summary: {
          en: "Fluent assertions for JDK types in Kotlin tests.",
          zh: "面向 JDK 类型的 Kotlin 流畅断言。",
        },
      },
      {
        name: "elasticsearch-script-velocity",
        repo: "https://github.com/Ahoo-Wang/elasticsearch-script-velocity",
        summary: {
          en: "Velocity templates for Elasticsearch scripts.",
          zh: "为 Elasticsearch 脚本引入 Velocity 模板语言。",
        },
      },
    ],
  },
  {
    title: { en: ".NET", zh: ".NET" },
    projects: [
      {
        name: "SmartSql",
        repo: "https://github.com/dotnetcore/SmartSql",
        docs: "https://wiki.smartsql.net",
        summary: {
          en: "High-performance C# ORM with caching and read/write splitting.",
          zh: "支持缓存与读写分离的高性能 C# ORM。",
        },
      },
      {
        name: "SmartCode",
        repo: "https://github.com/dotnetcore/SmartCode",
        summary: {
          en: "Code generation platform driven by structured data sources.",
          zh: "由结构化数据源驱动的代码生成平台。",
        },
      },
    ],
  },
];

export const allProjects = projectGroups.flatMap((group) => group.projects);

// ---------------------------------------------------------------- featured work

export type Metric = { value: string; label: Text };

export type CaseStudy = {
  project: string; // a name in `projectGroups`
  /** Technical figures that illustrate it, in order (see components/figures). */
  figures: ("spec" | "segments" | "bits" | "cache")[];
  headline: Text;
  problem: Text;
  decision: Text;
  tradeoff: Text;
  /** Published benchmark results, quoted as-is with where they come from. */
  metrics?: { items: Metric[]; source: Text; href: string };
  evidence: { label: Text; href: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    project: "Wow",
    figures: ["spec"],
    headline: { en: "Put the domain model at the heart of the system.", zh: "让领域模型成为系统的核心。" },
    problem: {
      en: "Complex business rules need traceable state changes and coordination across aggregates.",
      zh: "复杂业务规则需要可追溯的状态变化，以及跨聚合的流程协作。",
    },
    decision: {
      en: "Model every write as command → domain decision → event → projection, and verify behavior with Given → When → Expect specifications.",
      zh: "将每次写入建模为 命令 → 领域决策 → 事件 → 投影，并以 Given → When → Expect 规范验证行为。",
    },
    tradeoff: {
      en: "Worth it where history and rules justify Event Sourcing; plain CRUD may not need the cost.",
      zh: "适用于业务规则与历史追溯足以支撑事件溯源成本的系统；简单 CRUD 未必需要。",
    },
    evidence: [
      {
        label: { en: "Domain examples & tests", zh: "领域示例与测试" },
        href: "https://github.com/Ahoo-Wang/Wow/tree/main/example/example-domain",
      },
      { label: "KaiCode’26 Excellent Award", href: "https://www.kaicode.org/2026.html" },
    ],
  },
  {
    project: "CosId",
    figures: ["segments", "bits"],
    headline: { en: "Unique IDs without a coordination bottleneck.", zh: "没有协调瓶颈的全局唯一 ID。" },
    metrics: {
      items: [
        { value: "127M+", label: { en: "ops/s · SegmentChainId", zh: "ops/s · SegmentChainId" } },
        { value: "15.6M", label: { en: "ops/s · CosIdGenerator", zh: "ops/s · CosIdGenerator" } },
        { value: "4.096M", label: { en: "IDs/s per node · Snowflake", zh: "每节点 ID/秒 · Snowflake" } },
      ],
      source: { en: "JMH benchmarks, CosId docs", zh: "JMH 基准测试，CosId 文档" },
      href: "https://cosid.ahoo.me/guide/faq/perf-test.html",
    },
    problem: {
      en: "Distributed ID generation must handle machine identity, clock rollback and coordination overhead.",
      zh: "分布式 ID 生成需要同时处理机器号分配、时钟回拨与协调开销。",
    },
    decision: {
      en: "Two families of generators. SegmentChainId links ID segments into a lock-free chain; a PrefetchWorker keeps a safe distance of segments ready, doubling it when the generator runs hungry and halving it when the chain is full. SnowflakeId adds automatic machine-ID allocation and clock-rollback handling.",
      zh: "两类生成器。SegmentChainId 把号段串成无锁的号段链，由 PrefetchWorker 维持安全距离：消费过快（饥饿）时加倍预取，链已充足时减半回收。SnowflakeId 则补齐机器号自动分配与时钟回拨处理。",
    },
    tradeoff: {
      en: "Pick the algorithm and coordination store per deployment; component benchmarks are not application throughput guarantees.",
      zh: "按部署环境选择算法与协调存储；组件基准不等于业务系统的吞吐承诺。",
    },
    evidence: [
      { label: { en: "Algorithm design", zh: "算法设计" }, href: "https://github.com/Ahoo-Wang/CosId#introduction" },
      {
        label: { en: "JMH benchmarks", zh: "JMH 基准测试" },
        href: "https://cosid.ahoo.me/guide/faq/perf-test.html",
      },
    ],
  },
  {
    project: "CoSky",
    figures: ["cache"],
    headline: { en: "Service governance without a heavy footprint.", zh: "不增加运维负担的服务治理。" },
    metrics: {
      items: [
        { value: "706.7M", label: { en: "ops/s · config read, local cache", zh: "ops/s · 读取配置（本地缓存）" } },
        { value: "58.8k", label: { en: "ops/s · config read, Redis", zh: "ops/s · 读取配置（Redis）" } },
        { value: "≈12,000×", label: { en: "faster on the hot path", zh: "热路径提速" } },
      ],
      source: {
        en: "JMH, 8 threads, Apple M4 Pro, CoSky 6.0.0",
        zh: "JMH，8 线程，Apple M4 Pro，CoSky 6.0.0",
      },
      href: "https://cosky.ahoo.me/guide/performance",
    },
    problem: {
      en: "Services need discovery and shared configuration without another heavy cluster to operate.",
      zh: "服务需要注册发现与共享配置，又不想再运维一套沉重的集群。",
    },
    decision: {
      en: "Build on Redis: in-process caches kept fresh by Pub/Sub, integrated with Spring Cloud.",
      zh: "基于 Redis：进程内缓存配合 Pub/Sub 实时更新，并接入 Spring Cloud。",
    },
    tradeoff: {
      en: "A focused choice where Redis already fits; availability follows the Redis deployment you choose.",
      zh: "适用于已采用 Redis 的基础设施；可用性取决于所选的 Redis 部署方式。",
    },
    evidence: [
      { label: { en: "Architecture docs", zh: "架构文档" }, href: "https://cosky.ahoo.me" },
      { label: { en: "Service examples", zh: "服务示例" }, href: "https://github.com/Ahoo-Wang/CoSky/tree/main/examples" },
    ],
  },
];

export const findProject = (name: string): Project => {
  const project = allProjects.find((p) => p.name === name);
  if (!project) throw new Error(`Unknown project "${name}"`);
  return project;
};
