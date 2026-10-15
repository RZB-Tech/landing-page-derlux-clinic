import "server-only";

/** Escapes user text for Telegram's HTML parse mode. */
export function escapeTelegramHtml(text: string) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

/**
 * Sends an HTML message to the clinic's chat through the Bot API. The bot token and the chat come
 * from the server-only env vars `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Logs failures without
 * the token or the message, which holds the patient's data.
 */
export async function sendTelegramMessage(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: "HTML", link_preview_options: { is_disabled: true } }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const { description, parameters } = (await res.json().catch(() => ({}))) as {
        description?: string;
        parameters?: { migrate_to_chat_id?: number };
      };
      // A group upgraded to a supergroup gets a new id: TELEGRAM_CHAT_ID must be changed to it.
      const migrated = parameters?.migrate_to_chat_id ? ` (set TELEGRAM_CHAT_ID=${parameters.migrate_to_chat_id})` : "";
      console.error(`Telegram: sendMessage failed with ${res.status}: ${description ?? "no description"}${migrated}`);
    }
    return res.ok;
  } catch (error) {
    console.error("Telegram: sendMessage failed:", error instanceof Error ? error.message : error);
    return false;
  }
}
