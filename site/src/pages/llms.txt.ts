// A plain-text summary for LLM crawlers and answer engines (https://llmstxt.org).
import type { APIRoute } from "astro";
import { caseStudies, copy, findProject, person, projectGroups, seo, t, type Text } from "../content";

const en = (text: Text) => t(text, "en");

export const GET: APIRoute = () => {
  const lines = [
    `# ${person.name}`,
    "",
    `> ${en(seo.description)}`,
    "",
    en(copy.intro.lede),
    "",
    `- Email: ${person.email}`,
    `- GitHub: ${person.github}`,
    "",
    "## Selected work",
    "",
    ...caseStudies.flatMap((study) => {
      const project = findProject(study.project);
      return [
        `### ${project.name}`,
        "",
        `${en(study.headline)} Source: ${project.repo}${project.docs ? ` · Docs: ${project.docs}` : ""}`,
        "",
        `- Problem: ${en(study.problem)}`,
        `- Decision: ${en(study.decision)}`,
        `- Trade-off: ${en(study.tradeoff)}`,
        "",
      ];
    }),
    "## Open-source projects",
    "",
    ...projectGroups.flatMap((group) => [
      `### ${en(group.title)}`,
      "",
      ...group.projects.map((p) => `- [${p.name}](${p.docs ?? p.repo}): ${en(p.summary)}`),
      "",
    ]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
