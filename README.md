# currency-exchange

[![Maintainability](https://api.codeclimate.com/v1/badges/618013b1fe3b2d11d2bf/maintainability)](https://codeclimate.com/github/sombreroEnPuntas/currency-exchange/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/618013b1fe3b2d11d2bf/test_coverage)](https://codeclimate.com/github/sombreroEnPuntas/currency-exchange/test_coverage)

Simple web app that allows a user to browse their "pockets" and exchange currencies.

**NOTE: Requirements [here](assignment.pdf)**

## Scripts

This is a [Next.js](https://nextjs.org/) project.

A local env file is required to access APIs. Create one with `cp .env .env.local` and add missing keys.

The following scripts are available:

```js
yarn lint   // run tsc, eslint & prettier code checks
yarn test   // run jest tests (unit & integration)
yarn dev    // starts dev server locally, with hot reload
yarn build  // generate PRD bundle
yarn start  // starts PRD server
```

## Service

There's an API service (free tier) to provide exchange data: [openexchangerates.org](https://openexchangerates.org).

## CI

- `husky` enforces commit sanity locally
- `codeclimate` static analysis prevents accumulating technical debt
- pushing a commit triggers tests on github workflows
- PRs get automated reviews: comments and checks from codeclimate 🤖
- a changelog is auto-generated after pushing to master
