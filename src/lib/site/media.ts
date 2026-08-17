/** Return the URL of a populated media upload relationship, or null. */
export function getMediaUrl(media: unknown): string | null {
  if (typeof media === 'object' && media !== null && 'url' in media) {
    const url = (media as { url?: unknown }).url
    if (typeof url === 'string' && url) return url
  }
  return null
}
