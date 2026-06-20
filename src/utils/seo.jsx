export const SITE_NAME = "Kopalet";
export const SITE_URL = "https://kopalet.com";
export const DEFAULT_DESCRIPTION =
  "Kopalet is the careers, jobs, and marketplace platform for discovering opportunities, posting listings, and connecting with local professionals.";
export const DEFAULT_OG_IMAGE = "/default-company-logo.png";

export function getAbsoluteUrl(path) {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleaned}`;
}

export function truncateText(value, maxLength = 160) {
  if (!value) return "";
  const normalized = value.trim();
  if (normalized.length <= maxLength) return normalized;
  const truncated = normalized.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return `${truncated.slice(0, lastSpace)}...`;
  }
  return `${truncated}...`;
}
