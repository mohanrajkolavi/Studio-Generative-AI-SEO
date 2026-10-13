/**
 * Shared Anthropic client for pipeline steps that need Claude Sonnet for JSON tasks.
 * Used by: Knowledge Engine (topic-graph, insight-generator, framework-generator),
 * OpenAI client migration (extractTopicsAndStyle, buildResearchBrief).
 */

import Anthropic from "@anthropic-ai/sdk";
import {
  CLAUDE_SONNET_MODEL,
  THINKING_HEADROOM_TOKENS,
  claudeRequestOptions,
  getResponseText,
  type Effort,
} from "@/lib/ai/models";

const MODEL = CLAUDE_SONNET_MODEL;

let _client: Anthropic | null = null;

/** Singleton Anthropic client — shared across the entire pipeline. */
export function getSharedAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

/** @deprecated Use getSharedAnthropicClient() */
function getClient(): Anthropic {
  return getSharedAnthropicClient();
}

export function prewarmClient(): void {
  try { getClient(); } catch { /* ignore if no key during warmup */ }
}

/**
 * Call Claude Sonnet with a system + user prompt and get JSON back.
 * Handles markdown stripping and basic JSON extraction.
 */
export async function callClaudeJson(
  systemPrompt: string,
  userPrompt: string,
  options?: { effort?: Effort; maxTokens?: number; timeoutMs?: number }
): Promise<{ content: string; inputTokens: number; outputTokens: number }> {
  const client = getClient();
  // Streamed so the thinking headroom doesn't trip non-streaming request limits.
  const message = await client.beta.messages.stream({
    model: MODEL,
    max_tokens: (options?.maxTokens ?? 8192) + THINKING_HEADROOM_TOKENS,
    ...claudeRequestOptions(MODEL, options?.effort ?? "medium"),
    system: [{ type: "text" as const, text: systemPrompt, cache_control: { type: "ephemeral" as const } }],
    messages: [{ role: "user", content: userPrompt }],
  }, {
    timeout: options?.timeoutMs ?? 120_000,
  }).finalMessage();

  const text = getResponseText(message);
  if (!text) {
    throw new Error("Claude returned empty or non-text response");
  }

  return {
    content: text,
    inputTokens: message.usage?.input_tokens ?? 0,
    outputTokens: message.usage?.output_tokens ?? 0,
  };
}

/** Strip markdown code fences from JSON string. */
export function stripJsonMarkdown(raw: string): string {
  let s = raw.trim();
  const backtick = "```";
  if (s.startsWith(backtick)) {
    const end = s.indexOf(backtick, backtick.length);
    s = end > 0 ? s.slice(backtick.length, end) : s.slice(backtick.length);
  }
  if (s.startsWith("json")) s = s.slice(4);
  const jsonMatch = s.match(/\{[\s\S]*\}/);
  return jsonMatch ? jsonMatch[0] : s;
}

export { MODEL as CLAUDE_SONNET_MODEL };
