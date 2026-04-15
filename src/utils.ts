const BASE_URL = 'https://gist.github.com/'
const EMBED_PROVIDER_URL = 'https://em.ink.md/gist.html'

export function isGistURL(url: string): boolean {
  return url.startsWith(BASE_URL)
}

export function getEmbedURL(gistUrl: string, frameId: string): string {
  const isLocal = location.protocol === 'file:'
  return `${EMBED_PROVIDER_URL}?url=${encodeURIComponent(gistUrl)}&id=${frameId}&origin=${isLocal ? 0 : 1}`
}
