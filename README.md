# currency-exchange

Simple web app that allows a user to browse their "pockets" and exchange currencies.

**NOTE: Requirements [here](assignment.pdf)**

## Scripts

This is a [Next.js](https://nextjs.org/) project.

The following scripts are available:

```js
yarn lint   // run tsc, eslint & prettier code checks
yarn test   // run jest tests (unit & integration)
yarn dev    // starts dev server locally, with hot reload
yarn build  // generate PRD bundle
yarn start  // starts PRD server
```

## Service

There's an API service to provide exchange data: [openexchangerates.org](https://openexchangerates.org).

## CI

- `husky` enforces commit sanity locally
