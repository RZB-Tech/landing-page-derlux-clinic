import "server-only";

/** The data of one lead; `note` is the full request as plain text, kept on the lead as a comment. */
export type CrmLead = { name: string; phone: string; note: string };

/**
 * A long-lived token works only on its own account's host, https://{subdomain}.amocrm.ru (the shared
 * «api-b.amocrm.ru» from the token's payload answers «Account not found»). The clinic's account is
 * «drrahimov»; `AMOCRM_SUBDOMAIN` overrides it.
 */
function apiHost() {
  const subdomain = process.env.AMOCRM_SUBDOMAIN?.trim();
  return `${subdomain && /^[a-z0-9-]+$/.test(subdomain) ? subdomain : "drrahimov"}.amocrm.ru`;
}

async function amoRequest(host: string, token: string, path: string, body: unknown) {
  const res = await fetch(`https://${host}/api/v4${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    const detail = ((await res.json().catch(() => ({}))) as { title?: string; detail?: string }).detail;
    throw new Error(`${path} failed with ${res.status}: ${detail ?? "no detail"}`);
  }
  return res.json() as Promise<unknown>;
}

/**
 * Creates a lead with a contact (name + phone) in amoCRM's first stage of the main pipeline, then adds
 * the request as a comment. The token comes from the server-only env var `AMOCRM_ACCESS_TOKEN`. Logs
 * failures without the token or the patient's data.
 */
export async function createAmoLead({ name, phone, note }: CrmLead): Promise<boolean> {
  const token = process.env.AMOCRM_ACCESS_TOKEN;
  if (!token) {
    console.error("amoCRM: AMOCRM_ACCESS_TOKEN is not set");
    return false;
  }
  const host = apiHost();
  try {
    const created = (await amoRequest(host, token, "/leads/complex", [
      {
        name: `Заявка с сайта: ${name}`,
        _embedded: {
          contacts: [
            {
              first_name: name,
              custom_fields_values: [{ field_code: "PHONE", values: [{ value: `+${phone}`, enum_code: "WORK" }] }],
            },
          ],
        },
      },
    ])) as { id?: number }[];
    const leadId = created[0]?.id;
    if (!leadId) throw new Error("no lead id in the response");
    // The lead exists already: a failed comment must not make the request look unsent.
    await amoRequest(host, token, `/leads/${leadId}/notes`, [{ note_type: "common", params: { text: note } }]).catch((error) =>
      console.error("amoCRM: note failed:", error instanceof Error ? error.message : error),
    );
    return true;
  } catch (error) {
    console.error("amoCRM: lead failed:", error instanceof Error ? error.message : error);
    return false;
  }
}
