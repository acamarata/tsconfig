/**
 * Purpose: Validate that all tsconfig JSON files parse without error and contain expected keys.
 * Inputs: none — reads tsconfig.*.json from package root
 * Outputs: pass/fail per file to stdout; exits 1 on any failure
 * Constraints: runs with Node built-in fs — no deps
 */
import { readFileSync } from 'fs';

const variants = [
  { file: 'tsconfig.base.json', requiredKeys: ['compilerOptions'] },
  { file: 'tsconfig.library.json', requiredKeys: ['extends', 'compilerOptions'] },
  { file: 'tsconfig.node.json', requiredKeys: ['extends', 'compilerOptions'] },
  { file: 'tsconfig.react.json', requiredKeys: ['extends', 'compilerOptions'] },
];

const compilerOptionChecks = {
  'tsconfig.base.json': ['strict', 'skipLibCheck', 'noUncheckedIndexedAccess', 'exactOptionalPropertyTypes'],
  'tsconfig.library.json': ['declaration', 'declarationMap', 'sourceMap', 'outDir', 'module'],
  'tsconfig.node.json': ['declaration', 'declarationMap', 'sourceMap', 'outDir', 'module'],
  'tsconfig.react.json': ['declaration', 'declarationMap', 'sourceMap', 'outDir', 'jsx'],
};

let failed = false;

for (const { file, requiredKeys } of variants) {
  try {
    const content = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    const parsed = JSON.parse(content);

    for (const key of requiredKeys) {
      if (!(key in parsed)) {
        console.error(`FAIL ${file}: missing top-level key "${key}"`);
        failed = true;
      }
    }

    const expectedCompilerOptions = compilerOptionChecks[file] ?? [];
    for (const opt of expectedCompilerOptions) {
      if (!(opt in (parsed.compilerOptions ?? {}))) {
        console.error(`FAIL ${file}: missing compilerOptions.${opt}`);
        failed = true;
      }
    }

    if (!failed) {
      console.log(`PASS ${file}`);
    }
  } catch (err) {
    console.error(`FAIL ${file}: ${err.message}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
