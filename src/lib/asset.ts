// Resolves a root-relative /images or /videos path against the app's
// deployed base path (e.g. "/Davin-Saloon/" on GitHub Pages), since the
// browser would otherwise resolve a leading "/" against the domain root.
export function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
