import { LEADS_ENDPOINT } from "@/lib/site";

export type LeadPayload = Record<string, string | number> & {
  formType: "loan" | "partner" | "newsletter";
};

/**
 * Sends a lead to the Google Apps Script that writes the Finkuby Google Sheet.
 * `text/plain` keeps this a "simple" request, so the browser skips the CORS
 * preflight that Apps Script cannot answer.
 */
export async function submitLead(payload: LeadPayload): Promise<void> {
  const response = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  });
  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}`);
  }
}
