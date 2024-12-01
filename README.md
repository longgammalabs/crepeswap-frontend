# 🦎 IguanaDEX Frontend

<p align="center">
  <a href="https://iguanadex.com">
      <img src="https://raw.githubusercontent.com/IguanaDEX/assets/main/iguana_brand_assets/icon.webp" height="300">
  </a>
</p>

This repository contains the source code for the [IguanaDEX website](https://iguanadex.com).

## Documentation

- [Info](doc/Info.md)
- [Cypress tests](doc/Cypress.md)

> Install dependencies using [pnpm](https://pnpm.io)

## `apps/web`

<details>
<summary>
How to start
</summary>

```sh
pnpm i
```

start the development server

```sh
pnpm dev
```

build with production mode

```sh
pnpm build

# start the application after build
pnpm start
```

</details>

## Packages

| Package                                  | Description                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [sdk](/packages/swap-sdk)                | An SDK for building applications on top of Pancakeswap                                                      |
| [swap-sdk-core](/packages/swap-sdk-core) | Swap SDK Shared code                                                                                        |
| [wagmi](/packages/wagmi)                 | Extension for [wagmi](https://github.com/wagmi-dev/wagmi), including bsc chain and binance wallet connector |

## Vercel deployment

Install dependecies

```sh
pnpm i
```

Build all necessary packages

```sh
pnpm build
```

Link to vercel

```sh
vercel link
```

Build with vercel locally

```sh
vercel build --prod
```

Deploy prebuilded version

```sh
vercel --deploy --prod --pre-build
```
