/**
 * 
 * This module handles all the server-side rendering for your HTML and JS stuff, 
 * based on the contents of your elm-land.json file.
 * 
 */
const toIndexHtml = (custom) => {
  let elmLandJsonFile = loadElmLandJson()

  const title = custom.title || elmLandJsonFile.app.html.title

  const metaTags = toHtmlTags('meta', [
    ...elmLandJsonFile.app.html.meta,
    ...custom.meta
  ])
  const linkTags = toHtmlTags('link', [
    ...elmLandJsonFile.app.html.link,
    ...custom.link
  ])
  const scriptTags = toHtmlTags('script', [
    ...elmLandJsonFile.app.html.script,
    ...custom.script
  ], { hasClosingTag: true })


  return `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <title>${title}</title>${metaTags}${linkTags}
  </head>
  <body>
    <div id="app"></div>
    <script src="/elm-land.compiled.js"></script>
    <script src="/interop.js"></script>
    <script src="/main.js"></script>${scriptTags}
  </body>
</html>`.trim()
}

const toMainJs = () => {
  const elmLandJsonFile = loadElmLandJson()

  // Only render exposed JSON
  let env = elmLandJsonFile.app.env.reduce((obj, key) => {
    obj[key] = process.env[key]
    return obj
  }, {})

  return `
const startElmApp = async () => {
  let env = ${JSON.stringify(env)}
  let flags = window.ELM_LAND_INTEROP.flags({ env })

  let app = window.Elm.Main.init({ flags })
  return window.ELM_LAND_INTEROP.onReady({ env, app })
}

startElmApp().catch(console.error)
`.trim()
}

module.exports = {
  toIndexHtml,
  toMainJs
}

// HELPERS


const fromTagToHtml = (name, hasClosingTag) => (tag) => {
  let attributes =
    Object.entries(tag)
      .map(([k, v]) => `${k}="${v.split('"').join('&quot;')}"`)
      .join(' ')


  return attributes.length === 0
    ? ''
    : `<${name} ${attributes}>` + (hasClosingTag ? `</${name}>` : '')
}

const toHtmlTags = (name, tags, { hasClosingTag } = { hasClosingTag: false }) =>
  tags.map(fromTagToHtml(name, hasClosingTag)).map(line => '\n    ' + line).join('')

const loadElmLandJson = () => {
  // You can use this to delete its entry in the cache:
  if (process.env.NODE_ENV !== 'production') {
    delete require.cache[require.resolve('../elm-land.json')]
  }
  return require('../elm-land.json')
}