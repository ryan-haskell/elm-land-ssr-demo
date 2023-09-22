// Called before Elm Land runs
const flags = async ({ env }) => {
  console.log('flags', { env })
}

// Called after Elm Land runs
const onReady = async ({ env, app }) => {
  console.log('onReady', { env, app })
}

// Important for generated code to access these functions
window.ELM_LAND_INTEROP = { flags, onReady }