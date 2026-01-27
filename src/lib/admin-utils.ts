/**
 * Utility functions for generating user-friendly URLs and handling admin-friendly content management
 */

export function generateSlugFromTitle(title: string): string {
  return (
    "/" +
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Remove multiple consecutive hyphens
      .trim()
      .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
  );
}

export function validateAndFixSlug(slug: string): string {
  // Ensure slug starts with /
  let fixedSlug = slug.startsWith("/") ? slug : `/${slug}`;

  // Remove any invalid characters and clean up
  fixedSlug = fixedSlug
    .toLowerCase()
    .replace(/[^a-z0-9\s\/-]/g, "") // Keep letters, numbers, spaces, slashes, hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove multiple consecutive hyphens
    .replace(/\/+/g, "/"); // Remove multiple consecutive slashes

  return fixedSlug === "/" ? "/home" : fixedSlug;
}

export function formatTitleForAdmin(title: string): string {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function createBreadcrumbFromSlug(slug: string): string[] {
  return slug
    .split("/")
    .filter(Boolean)
    .map((part) =>
      part.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    );
}
