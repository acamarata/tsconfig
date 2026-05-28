# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-28

### Added

- `tsconfig.base.json`: strict base config with ES2022 target, bundler module resolution, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
- `tsconfig.library.json`: extends base, adds declaration output for publishable libraries (ESNext module, `declarationMap`, `sourceMap`)
- `tsconfig.node.json`: extends base, targets CommonJS for Node.js tools and scripts
- `tsconfig.react.json`: extends base, adds `jsx: react-jsx` and DOM lib for React applications
- JSON validation script (`scripts/validate-json.mjs`) to verify all variants parse and contain expected keys
- CI workflow validating JSON on Node 20, 22, and 24
