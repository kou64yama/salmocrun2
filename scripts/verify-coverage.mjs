import { readFile } from "node:fs/promises";
const report = JSON.parse(
  await readFile("coverage/coverage-final.json", "utf8"),
);
const required = ["src/App.tsx", "src/recognition.ts", "src/share.ts"];
for (const path of required) {
  const entry = Object.entries(report).find(([name]) =>
    name.endsWith(`/${path}`),
  );
  if (!entry) throw new Error(`Missing coverage data: ${path}`);
  const { s, statementMap } = entry[1];
  if (!Object.keys(s).length || !Object.keys(statementMap).length)
    throw new Error(`Empty coverage data: ${path}`);
}
