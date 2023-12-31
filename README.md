# Nuxt 3 Activity Map

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev -- -o
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Deploy on Vercel

```
Simply push on develop
```

Live URL : [nuxt-activities-morgana.vercel.app](nuxt-activities-morgana.vercel.app)

Main Improvments TODO :

- Pre-load activities for SSR
- Add functionnal tests
- Make filters work on store state if hydration failed to provide a deprecated but functional UX
