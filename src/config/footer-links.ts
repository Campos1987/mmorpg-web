/**
 * URLs externas do rodapé — camada de configuração, desacoplada da UI.
 * Apenas links públicos de comunidade; sem segredos ou tokens.
 *
 * Sobrescreva via `NEXT_PUBLIC_FOOTER_*` documentadas em `.env.example`.
 */

const DEFAULT_DISCORD_URL = "https://discord.gg/placeholder";
const DEFAULT_REDDIT_URL = "https://www.reddit.com/r/placeholder";

function readPublicFooterUrl(
  envKey: "NEXT_PUBLIC_FOOTER_DISCORD_URL" | "NEXT_PUBLIC_FOOTER_REDDIT_URL",
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
} as const;

export type FooterExternalLinkKey = keyof typeof FOOTER_EXTERNAL_LINKS;
