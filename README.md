# elm-land-ssr-demo
> Built with [Elm Land](https://elm.land) 🌈

## Context

If folks need meta tags for SEO, here's a proof-of-concept for how you can
use Elm Land with ExpressJS to have custom meta tags.

It still renders your app on the client-side, but you might find that
SSR and hydration aren't necessary to acheive great SEO results!


## Local development

```bash
# Requires Node.js v18+ (https://nodejs.org)
npm start
```

## Production deployment

You can deploy your ExpressJS server however you like,
but you'll want to make sure your Elm Land application's JS
files are built correctly.

```bash
# Compiles your Elm Land app to a single JS file
npm run build
```

Once that's done, deploy this Node.js app however you like, but be sure to include
these folders to prevent missing assets in runtime:

```
backend/
dist/
static/
```