/**
 * Image source guards.
 *
 * Dashboard content is edited by hand, so image fields occasionally contain
 * values `next/image` cannot resolve — absolute Windows paths such as
 * `"D:\site\banner.jpg"`, empty strings, or free text. An invalid source does
 * not degrade gracefully: it throws during render and takes the whole page
 * down.
 *
 * Every database-driven image therefore passes through `resolveImageSrc`
 * before it reaches `<Image />`, falling back to a bundled asset.
 */

const LOCAL_PATH = /^\/(?!\/)/; // "/products/adcal-d.webp", not "//cdn.example.com"
const REMOTE_URL = /^https?:\/\//i;

export const PLACEHOLDER_IMAGE = "/sanveex-logo.png";

/** True when the value is something `next/image` can actually render. */
export function isRenderableImageSrc(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const src = value.trim();
  return LOCAL_PATH.test(src) || REMOTE_URL.test(src);
}

/**
 * Returns a renderable image source, or `fallback` when the stored value is
 * unusable. Pass `null` as the fallback when the caller would rather render
 * something else (a gradient panel, an icon) instead of a placeholder image.
 */
export function resolveImageSrc(
  value: unknown,
  fallback: string | null = PLACEHOLDER_IMAGE,
): string | null {
  if (isRenderableImageSrc(value)) return value.trim();
  return fallback;
}
