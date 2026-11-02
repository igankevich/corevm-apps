# CoreVM apps

Menu of CoreVM demo applications: <https://igankevich.github.io/corevm-apps/>

A single-page Vue 3 app (Options API, `vue-router`) that lists links to the demos. The demos
themselves are built and deployed separately.

## Development

```bash
bun install
bun run vite dev      # local dev server
bun run vite build    # production build in dist/
```

## Adding a demo

Edit `src/demos.js` and add an entry:

```js
{
  id: 'my-demo',
  name: 'My Demo',
  description: 'One or two sentences.',
  url: 'my-demo/',            // relative to this page, or absolute
  tags: ['rust'],
  status: 'live',             // 'live' | 'beta' | 'soon'
}
```
