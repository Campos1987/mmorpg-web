/**
 * URLs externas do rodapé — camada de configuração, desacoplada da UI.
 * Apenas links públicos de comunidade; sem segredos ou tokens.
 *
 * Sobrescreva via `NEXT_PUBLIC_FOOTER_*` documentadas em `.env.example`.
 */

const DEFAULT_DISCORD_URL = "https://discord.gg/placeholder";
const DEFAULT_REDDIT_URL = "https://www.reddit.com/r/placeholder";
const DEFAULT_TWITCH_URL = "https://www.twitch.tv/placeholder";
const DEFAULT_X_URL = "https://x.com/placeholder";
const DEFAULT_FACEBOOK_URL = "https://www.facebook.com/placeholder";
const DEFAULT_YOUTUBE_URL = "https://www.youtube.com/placeholder";
const DEFAULT_INSTAGRAM_URL = "https://www.instagram.com/placeholder";
const DEFAULT_TIKTOK_URL = "https://www.tiktok.com/placeholder";

function readPublicFooterUrl(
  envKey:
    | "NEXT_PUBLIC_FOOTER_DISCORD_URL"
    | "NEXT_PUBLIC_FOOTER_REDDIT_URL"
    | "NEXT_PUBLIC_FOOTER_TWITCH_URL"
    | "NEXT_PUBLIC_FOOTER_X_URL"
    | "NEXT_PUBLIC_FOOTER_FACEBOOK_URL"
    | "NEXT_PUBLIC_FOOTER_YOUTUBE_URL"
    | "NEXT_PUBLIC_FOOTER_INSTAGRAM_URL"
    | "NEXT_PUBLIC_FOOTER_TIKTOK_URL",
  fallback: string,
): string {
  const raw = process.env[envKey]?.trim();
  if (!raw) {
    return fallback;
  }

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return fallback;
    }
    return parsed.href;
  } catch {
    return fallback;
  }
}

export const FOOTER_EXTERNAL_LINKS = {
  DISCORD: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_DISCORD_URL",
    DEFAULT_DISCORD_URL,
  ),
  REDDIT: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_REDDIT_URL",
    DEFAULT_REDDIT_URL,
  ),
  TWITCH: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_TWITCH_URL",
    DEFAULT_TWITCH_URL,
  ),
  X: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_X_URL",
    DEFAULT_X_URL,
  ),
  FACEBOOK: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_FACEBOOK_URL",
    DEFAULT_FACEBOOK_URL,
  ),
  YOUTUBE: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_YOUTUBE_URL",
    DEFAULT_YOUTUBE_URL,
  ),
  INSTAGRAM: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_INSTAGRAM_URL",
    DEFAULT_INSTAGRAM_URL,
  ),
  TIKTOK: readPublicFooterUrl(
    "NEXT_PUBLIC_FOOTER_TIKTOK_URL",
    DEFAULT_TIKTOK_URL,
  ),
} as const;

export type FooterExternalLinkKey = keyof typeof FOOTER_EXTERNAL_LINKS;
