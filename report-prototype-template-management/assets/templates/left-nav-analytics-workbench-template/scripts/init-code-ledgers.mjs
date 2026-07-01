import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
const root = process.cwd();
const writeMissing = args.includes('--write') || args.includes('--fix');

const getArg = (name, fallback = '') => {
  const index = args.indexOf(name);
  if (index >= 0 && index + 1 < args.length) {
    return args[index + 1];
  }
  const prefixed = args.find((arg) => arg.startsWith(`${name}=`));
  return prefixed ? prefixed.slice(name.length + 1) : fallback;
};

const now = () => new Date().toISOString();
const hash = (text) => crypto.createHash('sha256').update(text).digest('hex');
const lineCount = (text) => (text ? text.split(/\r?\n/).length : 0);
const toProjectPath = (value) => path.relative(root, value).split(path.sep).join('/');

const excludedDirs = new Set([
  '.git',
  '.vite',
  'coverage',
  'dist',
  'node_modules',
  'patches',
  'visual-check',
  '__change_logs__',
]);

const excludedFiles = new Set(['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']);
const includedExtensions = new Set([
  '.css',
  '.js',
  '.jsx',
  '.json',
  '.less',
  '.mjs',
  '.scss',
  '.ts',
  '.tsx',
  '.vue',
]);
const includedBasenames = new Set(['index.html', 'package.json']);

const shouldIncludeFile = (filePath) => {
  const basename = path.basename(filePath);
  if (excludedFiles.has(basename)) {
    return false;
  }
  if (basename.endsWith('.changes.md')) {
    return false;
  }
  return includedBasenames.has(basename) || includedExtensions.has(path.extname(filePath));
};

const collectFiles = (dir, files = []) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!excludedDirs.has(entry.name) && !entry.name.startsWith('visual-check')) {
        collectFiles(path.join(dir, entry.name), files);
      }
      continue;
    }

    if (entry.isFile()) {
      const filePath = path.join(dir, entry.name);
      if (shouldIncludeFile(filePath)) {
        files.push(filePath);
      }
    }
  }
  return files;
};

const ledgerPathFor = (codePath) =>
  path.join(path.dirname(codePath), '__change_logs__', `${path.basename(codePath)}.changes.md`);

const createBaselineLedger = (codePath) => {
  const codeText = readFileSync(codePath, 'utf8');
  const codeRel = toProjectPath(codePath);
  const ledgerPath = ledgerPathFor(codePath);
  const ledgerRel = toProjectPath(ledgerPath);
  const stats = statSync(codePath);

  mkdirSync(path.dirname(ledgerPath), { recursive: true });
  writeFileSync(
    ledgerPath,
    `# Code Change Ledger: ${codeRel}

- Code file: \`${codeRel}\`
- Ledger file: \`${ledgerRel}\`
- Purpose: Baseline ledger created by \`npm run ledger:init\`; fill exact ownership before the next functional edit.
- Primary features: TBD
- Last reviewed before edit: ${now()} / baseline / ${getArg('--actor', 'codex')}
- Ledger rule: read this file before editing the code file; append a version entry after every scoped change.

## Functional Inventory

| Feature ID | Feature / Behavior | Main Code Range | Inputs | Outputs | Notes |
| --- | --- | --- | --- | --- | --- |
| FEAT-TBD | TBD | TBD | TBD | TBD | Created from current file baseline. |

## Version Entries

### baseline - ${now()}

- Change ID: baseline
- Actor: ${getArg('--actor', 'codex')}
- Change type: baseline
- Summary: Initial sidecar ledger created for project-wide traceability.
- Modified functionality: none
- Code ranges: full file baseline, ${lineCount(codeText)} lines
- Modified content: none
- Affected contracts: none
- Verification: baseline only; ${stats.size} bytes, sha256 \`${hash(codeText)}\`
- Rollback note: no functional change in this entry.
- Related files: none
- Before snapshot: not applicable for baseline
- After snapshot: ${lineCount(codeText)} lines, sha256 \`${hash(codeText)}\`
- Change evidence: baseline ledger creation only; no source-code diff.
- Follow-up: fill purpose, feature inventory, and stable code ranges during the next functional change.
`,
    'utf8',
  );
};

const scopedFiles = collectFiles(root).sort((left, right) =>
  toProjectPath(left).localeCompare(toProjectPath(right)),
);

const missing = scopedFiles.filter((filePath) => !existsSync(ledgerPathFor(filePath)));

if (!missing.length) {
  console.log(`[code-ledger] all ${scopedFiles.length} scoped files have __change_logs__ sidecars`);
  process.exit(0);
}

if (!writeMissing) {
  console.error(`[code-ledger] ${missing.length} scoped files are missing __change_logs__ sidecars`);
  for (const filePath of missing) {
    console.error(`- ${toProjectPath(filePath)} -> ${toProjectPath(ledgerPathFor(filePath))}`);
  }
  console.error('[code-ledger] run npm run ledger:init to create baseline ledgers');
  process.exit(1);
}

for (const filePath of missing) {
  createBaselineLedger(filePath);
}

console.log(
  `[code-ledger] created ${missing.length} baseline ledgers; ${scopedFiles.length - missing.length} already existed`,
);
